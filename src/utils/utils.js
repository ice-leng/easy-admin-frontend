import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom'
import { EventEmitter } from 'events';

/**
 * 生成路由配置表
 * @param {Objest} paths 
 */
const createRouters = (paths) => {
    const router = []
    let childRouter = [];

    //一级路由
    paths.keys().forEach(item => {
        const path = '/' + item.replace('./', '').replace('/index.jsx', '');
        const componentPath = 'pages' + item.replace('.', '');

        if (item.split('/').length < 4) {
            router.push({
                path,
                key: path,
                title: 'title',
                icon: 'HomeOutlined',
                componentPath,
                exact: true,
                children: []
            })
        } else {
            childRouter.push(item.replace('.', '').replace('/index.jsx', ''))
        }
    })

    /**
     * 添加子路由
     * @param {Array} rootRouter 父路由
     * @param {Array} routers 子路由
     */
    const createChildren = (rootRouter, routers) => {

        for (let i = 0; i < routers.length; i++) {
            for (let j = 0; j < rootRouter.length; j++) {

                if (routers[i].split(rootRouter[j].path) && routers[i].split(rootRouter[j].path)[1]?.split('/').length === 2) {
                    const current = routers[i]
                    const index = rootRouter[j].children.findIndex(item => current.split(item.path)[1]?.split('/').length === 2)

                    if (index > -1) {
                        rootRouter[j].children[index].push({
                            path: routers[i],
                            key: routers[i],
                            title: 'title',
                            icon: 'HomeOutlined',
                            componentPath: 'pages' + routers[i],
                            exact: true,
                            children: []
                        })
                        routers.splice(i, 1);
                        i = i - 1;
                    } else {
                        rootRouter[j].children.push({
                            path: routers[i],
                            key: routers[i],
                            title: 'title',
                            icon: 'HomeOutlined',
                            componentPath: 'pages' + routers[i],
                            exact: true,
                            children: []
                        })
                        routers.splice(i, 1);
                        i = i - 1;
                    }
                    break;
                } else if (routers[i].split(rootRouter[j].path) && routers[i].split(rootRouter[j].path)[1]?.split('/').length > 2) {

                    if (i + 1 === routers.length) {
                        createChildren(rootRouter[j].children, JSON.parse(JSON.stringify(routers)).slice(i))
                    } else {
                        createChildren(rootRouter[j].children, JSON.parse(JSON.stringify(routers)).slice(i, 1))
                    }
                    break;
                }
            }

        }
    }

    childRouter = childRouter.sort();
    createChildren(router, childRouter)
    return router
}


/**
 * 生成路由
 * @param {Array} routes 路由配置表
 */
const createRoutes = (routes) => {
    return routes.map(item => {
        const ComponentName = lazy(() => import(`@/${item.componentPath}`));
        const Component = (<Route path={item.path} render={(routerData) => {
            return <Suspense fallback={<div>Loading...</div>}><ComponentName {...routerData}></ComponentName></Suspense>
        }} key={item.path} exact />)

        if (item.children && item.children.length) {
            return [Component, ...createRoutes(item.children)]
        } else if (item.componentPath) {
            return Component
        } else {
            return null;
        }
    })

}


/**
 * 创建路由
 * @param {Array} routes 
 */
const useCreateRoutes = (routes) => createRoutes(routes)


/**
 * 事件总线
 */
const eventEmitter = new EventEmitter();

/**
 * 复制
 * @param {String} value 复制的内容
 * @returns {Boolean} 操作结果
 */
const copy = (value) => {
    var currentFocus = document.activeElement;// 保存当前活动节点

    var input = document.createElement('input');// 创建一个input标签
    document.body.appendChild(input);// 把标签添加给body
    input.style.opacity = 0;//设置input标签设置为透明(不可见)
    input.value = value;// 把需要复制的值放到input上

    // 记录当前滚动位置, 因为添加节点并选中的时候会影响页面滚动
    var scrollY = window.scrollY;

    input.focus();// input节点获取焦点
    input.setSelectionRange(0, input.value.length);// 选中input框中的所有文字

    var res = document.execCommand('copy', true);// 复制文字并获取结果

    currentFocus.focus();// 之前活动节点获得焦点
    document.body.removeChild(input);// 删除添加的input节点

    // 页面滚动到之前位置
    window.scrollTo(0, scrollY);

    return res;// 返回操作结果
}

/**
 * 防抖
 * @param {*} fn 
 * @param {*} wait 
 */
const debounce = (fn, wait = 0) => {
    let timer = null;
    return function (...args) {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => { fn.apply(null, args) }, wait);
    }
}

/**
 * 
 * @param {Function} fn 需要被节流的函数
 * @param {Number} delay 延时 
 */
const throttle = (fn, delay = 1000) => {
    let timer = null;
    let firstTime = true;

    return function (...args) {
        if (firstTime) {
            fn.apply(this, args);
            return firstTime = false;
        }
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(this, args);
        }, delay);
    };
}

export { useCreateRoutes, createRouters, eventEmitter, copy, debounce ,throttle}


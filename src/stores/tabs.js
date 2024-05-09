import {defineStore} from 'pinia'


export const useTabsStore = defineStore('tabs', {
    state: () => ({
        tabs: [{
            name: "/home", title: "首页",
        }, {
            name: "/dashboard", title: "dashboard",
        }], currentTab: undefined,
    }), actions: {
        // 重置状态
        reset() {
            this.setFrom(null)
            this.setTo(null)
            this.setMsg(null)
        }, setTabs(tabs) {
            this.tabs = tabs;
        }, setCurrentTab(currentTab) {
            this.currentTab = currentTab;
        }, addTab(tab) {
            this.tabs.push(tab)
            this.setCurrentTab(tab)
        }
    }, getters: {}, persist: {
        enabled: true,
    }
})



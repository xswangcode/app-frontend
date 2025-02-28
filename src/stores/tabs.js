import {defineStore} from 'pinia'

export const useTabsStore = defineStore('tabs', {
    state: () => ({
        tabs: [{name: "首页", path: "/home"}],
        currentTab: "首页",
    }),

    actions: {
        // 重置状态，直接重置 state 中的 tabs 和 currentTab
        reset() {
            this.tabs = [{name: "首页", path: "/home"}];
            this.currentTab = undefined;
        },

        // 设置 tabs
        setTabs(tabs) {
            this.tabs = tabs;
        },

        // 设置当前 tab
        setCurrentTab(tab) {
            this.currentTab = tab?.name || undefined;
        },

        // 添加 tab
        addTab(tab) {
            const existingTab = this.tabs.find(item => item.path === tab.path);
            if (existingTab) {
                this.setCurrentTab(existingTab);
            } else {
                this.tabs.push(tab);
                this.setCurrentTab(tab);
            }
        },

        // 删除 tab
        removeTab(tabName) {
            if (tabName === '首页' || tabName === '/home') return;
            const tabIndex = this.tabs.findIndex(item => item.name === tabName || item.path === tabName);
            if (tabIndex !== -1) {
                this.tabs.splice(tabIndex, 1);
            }
            if (this.currentTab === tabName && this.tabs.length > 0) {
                this.setCurrentTab(this.tabs[this.tabs.length - 1]);
            }
        },
    },

    persist: {
        enabled: true,
    },

    getters: {
        currentTabName: (state) => state.currentTab,
    }
});


import {defineStore} from 'pinia'

export const useTabsStore = defineStore('tabs', {
    state: () => ({
        tabs: [{name: "首页", path: "/home"}
        ],
        currentTab: undefined,
    }),

    actions: {
        // 重置状态，直接重置 state 中的 tabs 和 currentTab
        reset() {
            this.tabs = [{name: "首页", path: "/home"}];
            this.currentTab = undefined;
        },

        // 设置 tabs
        setTabs(tabs) {
            debugger
            this.tabs = tabs;
        },

        // 设置当前 tab
        setCurrentTab(tab) {
            debugger
            this.currentTab = tab?.name || undefined;
        },

        // 添加 tab
        addTab(tab) {
            debugger
            // 如果 tabs 中已经存在该 tab，则只更新 currentTab
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
            debugger
            // 如果删除的是首页 tab，则不做任何操作
            if (tabName === '首页') return;

            // 移除指定的 tab
            const tabIndex = this.tabs.findIndex(item => item.name === tabName);
            if (tabIndex !== -1) {
                this.tabs.splice(tabIndex, 1);
            }

            // 如果当前 tab 被删除，设置新的当前 tab
            if (this.currentTab === tabName && this.tabs.length > 0) {
                this.setCurrentTab(this.tabs[this.tabs.length - 1]);
            }
        },
    },

    persist: {
        enabled: true, // 启用持久化
    }
});

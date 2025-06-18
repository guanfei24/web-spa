export const buildMenuTree = (flatMenuList) => {
    const menuMap = {};
    const tree = [];

    flatMenuList.forEach((menu) => {
        menu.children = [];
        menuMap[menu.id] = menu;
    });

    flatMenuList.forEach((menu) => {
        if (menu.parent_id && menu.parent_id !== 0) {
            if (menuMap[menu.parent_id]) {
                menuMap[menu.parent_id].children.push(menu);
            }
        } else {
            tree.push(menu);
        }
    });

    return tree;
};
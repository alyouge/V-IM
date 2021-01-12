class Tools {
  /**
   * 数组转化为 tree
   * @param list list
   * @param parentId parentId
   * @return {*} 结果
   */
  static list2tree = (list, parentId) => {
    let menuObj = {};
    list.forEach(item => {
      item.children = [];
      menuObj[item.id] = item;
    });
    return list.filter(item => {
      if (item.parentId !== parentId) {
        menuObj[item.parentId].children.push(item);
        return false;
      }
      return true;
    });
  };
}

export default Tools;

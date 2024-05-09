const useNode = () => {
    const insertNode = function (tree, commentId, item, user) {
      if (tree.id === commentId) {
        tree.items.push({
          id: new Date().getTime(),
          user: user,
          name: item,
          items: [],
        });
  
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.items.map((ob) => {
        return insertNode(ob, commentId, item, user);
      });
  
      return { ...tree, items: latestNode };
    };
  
    const editNode = (tree, commentId, value) => {
      if (tree.id === commentId) {
        tree.name = value;
        return tree;
      }
  
      tree.items.map((ob) => {
        return editNode(ob, commentId, value);
      });
  
      return { ...tree };
    };
  
    const deleteNode = (tree, id) => {
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem.id === id) {
          tree.items.splice(i, 1);
          // console.log(currentItem)
          // console.log(id)

          return tree;
        } else {
          deleteNode(currentItem, id);
          // console.log(currentItem)
          // console.log(id)
        }
      }
      return tree;
    };
  
    return { insertNode, editNode, deleteNode };
  };
  
  export default useNode;
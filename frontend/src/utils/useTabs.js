import { useState } from "react";

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  if (!allTabs || !Array.isArray(allTabs)) {
    return {
      currentItem: null,
      changeItem: () => {},
    };
  }
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};

export default useTabs;

// 사용법
// const content = [
//     {
//       tab: "Section 1",
//       content: "Content of the Section 1",
//     },
//     {
//       tab: "Section 2",
//       content: "Content of the Section 2",
//     },
//   ];
// const { currentItem, changeItem } = useTabs(0, content);
// 출력
// <div>
// {content.map((section, index) => (
//     <button onClick={() => changeItem(index)}>{section.tab}</button>
//   ))}
//   <div>{currentItem.content}</div>
// </div>

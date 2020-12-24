export default (rows, rowNum, cellNum, updatedNum) => {
  const isEmptyCellInCurrentRow = rows[rowNum].find(item => item.num === "");

  if (isEmptyCellInCurrentRow) {
    // если пустая ячейка в строке, где был клик
    const emptyCellNum = isEmptyCellInCurrentRow.cell;
    if (emptyCellNum - 1 === cellNum || emptyCellNum + 1 === cellNum) {
      rows[rowNum].forEach(item => {
        if (item.cell === emptyCellNum) item.num = updatedNum;
        if (item.cell === cellNum) item.num = "";
      });
    }
  } else {
    switch (rowNum) {
      case 0: // если клик по ячейке в первой строке
        {
          const isEmptyCellInNextRow = rows[rowNum + 1].find(
            item => item.num === ""
          );
          if (isEmptyCellInNextRow) {
            const emptyCellNum = isEmptyCellInNextRow.cell;
            if (emptyCellNum !== cellNum) return;
            rows[rowNum].forEach(item => {
              if (item.cell === cellNum) item.num = "";
            });
            rows[rowNum + 1].forEach(item => {
              if (item.cell === cellNum) item.num = updatedNum;
            });
          }
        }
        break;
      case 3: // если клик по ячейке в четвертой строке
        {
          const isEmptyCellInPrevRow = rows[rowNum - 1].find(
            item => item.num === ""
          );
          if (isEmptyCellInPrevRow) {
            const emptyCellNum = isEmptyCellInPrevRow.cell;
            if (emptyCellNum !== cellNum) return;
            rows[rowNum].forEach(item => {
              if (item.cell === cellNum) item.num = "";
            });
            rows[rowNum - 1].forEach(item => {
              if (item.cell === cellNum) item.num = updatedNum;
            });
            return;
          }
        }
        break;
      case 1:
      case 2: // если клик по ячейке во второй или третьей строке
        {
          const isEmptyCellInPrevRow = rows[rowNum - 1].find(
            item => item.num === ""
          );
          if (isEmptyCellInPrevRow) {
            const emptyCellNum = isEmptyCellInPrevRow.cell;
            if (emptyCellNum !== cellNum) return;
            rows[rowNum].forEach(item => {
              if (item.cell === cellNum) item.num = "";
            });
            rows[rowNum - 1].forEach(item => {
              if (item.cell === cellNum) item.num = updatedNum;
            });
            return;
          }
          const isEmptyCellInNextRow = rows[rowNum + 1].find(
            item => item.num === ""
          );
          if (isEmptyCellInNextRow) {
            const emptyCellNum = isEmptyCellInNextRow.cell;
            if (emptyCellNum !== cellNum) return;
            rows[rowNum].forEach(item => {
              if (item.cell === cellNum) item.num = "";
            });
            rows[rowNum + 1].forEach(item => {
              if (item.cell === cellNum) item.num = updatedNum;
            });
          }
        }
        break;
      default:
        return;
    }
  }
};

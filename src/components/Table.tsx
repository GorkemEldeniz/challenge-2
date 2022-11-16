import React, { useState } from 'react'
import imageUrl from '../image.json'

interface check {
  src: string
  row: number
  col: number
  name: string
}

interface cells extends check {
  isOpen: boolean
  isMatched: boolean
  id: number
}

const randomImageOrder = imageUrl.path.sort((a, b) => 0.5 - Math.random())

function createTable (colN: number, rowN: number): cells[][] {
  const tableAr = []
  for (let row = 0; row < rowN; row++) {
    const rowAr = []
    for (let col = 0; col < colN; col++) {
      rowAr.push({
        isOpen: false,
        isMatched: false,
        row,
        col,
        src: randomImageOrder[row * 4 + col].src,
        id: row * 4 + col,
        name: randomImageOrder[row * 4 + col].name
      })
    }
    tableAr.push(rowAr)
  }
  return tableAr
}

const Table: React.FC = () => {
  const ROW = 4
  const COL = 4
  const [table, setTable] = useState(() => createTable(COL, ROW))
  const [check, setCheck] = useState<check[]>([])

  /* update table methodu yaz */

  const checkTheMatch = (): void => {
    const [firstItem, secondItem] = check
    if (firstItem.name === secondItem.name) {
      /* win condition!! */
      console.log('buldun')
      const updatedTable = table.map((ROW, rowI) => {
        return ROW.map((COL, colI) => {
          if (rowI === firstItem.row && colI === firstItem.col) {
            COL.isMatched = true
          }
          if (rowI === secondItem.row && colI === secondItem.col) {
            COL.isMatched = true
          }
          return COL
        })
      })
      setTable(updatedTable)
    } else {
      const updatedTable = table.map((ROW, rowI) => {
        return ROW.map((COL, colI) => {
          if (rowI === firstItem.row && colI === firstItem.col) {
            COL.isOpen = false
          }
          if (rowI === secondItem.row && colI === secondItem.col) {
            COL.isOpen = false
          }
          return COL
        })
      })
      setTable(updatedTable)
      /* lose condition! */
    }
    setCheck([])
  }

  const handleClick = (row: number, col: number): void => {
    if (table[row][col].isMatched) return
    if (check.length === 2) checkTheMatch()
    else {
      const updatedTable = table.map((ROW, rowI) => {
        return ROW.map((COL, colI) => {
          if (row === rowI && col === colI) {
            COL.isOpen = true
            setCheck([...check, { src: COL.src, col, row, name: COL.name }])
          }
          return COL
        })
      })
      setTable(updatedTable)
    }
  }
  return (
    <div className='table'>
      {table.map((row, rowI) => {
        return row.map((col, colI) => {
          return <span key={col.id} onClick={() => handleClick(rowI, colI)}>
            {col.isOpen
              ? <img src={col.src}/>
              : <span className="material-symbols-outlined">
                lock
                </span>}
          </span>
        })
      })}
    </div>
  )
}

export default Table

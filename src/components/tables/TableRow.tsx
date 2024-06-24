import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataHeadTable } from "../../types";
import { TableCell, TableCellSelect } from "./";

interface TableRowProps<T> {
  item: T;
  dataHead: DataHeadTable[];
  index: number;
  showActions: boolean;
  onClickIcon: () => void
}

export const TableRow = <T,>({
  dataHead,
  index,
  item,
  showActions,
  onClickIcon
}: TableRowProps<T>) => {
  return (
    <tr className={`${index % 2 === 1 && "bg-gray-200"}`}>
      {dataHead.map((data, index) => {
        const dataCell: DataHeadTable = {
          ...data,
          nombre: String(item[data.key as keyof T]),
        };
        return data.isSelectColor ? (
          <TableCellSelect item={dataCell} key={index} />
        ) : (
          <TableCell dataHead={dataCell} key={index} />
        );
      })}

      {showActions && (
        <td className="px-4 py-3 text-center">
          <FontAwesomeIcon
            icon={faTrash}
            className="fa-solid fa-trash mx-1 text-red-500 cursor-pointer"
            onClick={() => onClickIcon()}
          />
        </td>
      )}
    </tr>
  );
};
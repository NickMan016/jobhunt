import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataHeadTable } from "../../types";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface TableCellSelectProps {
  item: DataHeadTable;
  enabledChangeSelect: boolean;
}

export const TableCellSelect = ({ item, enabledChangeSelect }: TableCellSelectProps) => {
  const { id, configSelectColor, nombre, onChange } = item;
  const [showData, setShowData] = useState(false);
  const [config, setConfig] = useState(configSelectColor?.find(
    (config) => config.value.toString() === nombre
  ));

  useEffect(() => {
    setConfig(configSelectColor?.find(
      (config) => config.value.toString() === nombre
    ))
  }, [item])
  

  return (
    <td className="px-4 py-3">
      <button
        onClick={() => enabledChangeSelect && setShowData(!showData)}
        className={`inline px-3 py-1 rounded-full text-sm font-semibold relative ${
          config?.color === "success"
            ? "bg-green-100 text-green-600"
            : config?.color === "error"
            ? "bg-red-100 text-red-600"
            : config?.color === "waring"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {config?.label}
        {
          enabledChangeSelect && (

            <FontAwesomeIcon icon={faChevronDown} className="text-xs ml-1" />
          )
        }
        <div
          className={`absolute left-0 top-8 w-full flex flex-col gap-2 py-2 px-1 bg-white rounded-md shadow-float transition-all duration-300 ease-in-out z-10 ${
            showData
              ? "opacity-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 translate-y-[-10px] pointer-events-none invisible"
          }`}
        >
          {configSelectColor?.map((config, index) => (
            <button
              key={index}
              onClick={() => {
                setConfig(config);
                !!onChange && onChange(id!, config.value.toString());
              }}
              className={`inline px-3 py-1 rounded-full text-sm font-semibold relative ${
                config?.color === "success"
                  ? "bg-green-100 text-green-600"
                  : config?.color === "error"
                  ? "bg-red-100 text-red-600"
                  : config?.color === "waring"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </button>
    </td>
  );
};

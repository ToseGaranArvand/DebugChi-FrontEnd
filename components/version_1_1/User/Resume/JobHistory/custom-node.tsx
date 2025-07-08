import { memo } from "react"
import { Handle, Position } from "reactflow"
import { cn } from "@/lib/utils"

function CustomNode({ data, isConnectable }:{data:any,isConnectable:any}) {
  return (
    <div
      className={cn(
        "px-4 py-2 rounded-md transition-all duration-300 text-sm md:text-base shadow-md border border-[#2a1c45]",
        data.active ? "bg-purple-500 text-white" : "bg-[#2a1c45] text-gray-300",
      )}
    >
      {data.label}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-purple-500"
      />
    </div>
  )
}

export default memo(CustomNode)

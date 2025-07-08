import { memo } from "react"
import { Handle, Position } from "reactflow"
import { cn } from "@/lib/utils"

function ServiceItemNode({ data, isConnectable }:{data:any,isConnectable:any}) {
  return (
    <div
      className={cn(
        "w-[200px] text-left px-4 py-3 rounded-md transition-all duration-300 text-sm shadow-md",
        data.active
          ? "bg-[#2a1c45] text-purple-300 border-l-4 border-purple-500"
          : "bg-[#1a1025] text-gray-400 border border-[#2a1c45]",
      )}
    >
      {data.id}. {data.title}
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="w-3 h-3 bg-purple-500" />
    </div>
  )
}

export default memo(ServiceItemNode)

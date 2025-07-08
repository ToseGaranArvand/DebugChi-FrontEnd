import { memo } from "react"
import { Handle, Position } from "reactflow"

function DetailNode({ data, isConnectable }:{data:any,isConnectable:any}) {
  if (!data.visible) {
    return null
  }

  return (
    <div className="bg-[#1e1433] rounded-xl p-4 shadow-lg border border-[#2a1c45] w-[250px]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-purple-500" />
      <h3 className="text-lg font-medium text-white mb-2">{data.title}</h3>
      <p className="text-gray-300 text-sm">{data.content}</p>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-purple-500"
      />
    </div>
  )
}

export default memo(DetailNode)

"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"
import CustomNode from "./custom-node"
import ServiceItemNode from "./save-item"
import DetailNode from "./detail-node"

// Register custom node types
const nodeTypes = {
  customNode: CustomNode,
  serviceItemNode: ServiceItemNode,
  detailNode: DetailNode,
}

// Define the navigation items
const navItems = [
  { id: "home", label: "Home", active: true },
  { id: "about", label: "About", active: false },
  { id: "services", label: "Services", active: true },
  { id: "portfolios", label: "Portfolios", active: true },
  { id: "blog", label: "Blog", active: false },
  { id: "contact", label: "Contact", active: false },
]

// Define the service items
const serviceItems = [
  { id: 1, title: "Web Developer", content: "Frontend and backend development with modern frameworks." },
  { id: 2, title: "CV/Resume", content: "Professional CV and resume writing services." },
  { id: 3, title: "Software Developer", content: "Custom software solutions for businesses." },
  { id: 4, title: "Graphic Designer", content: "Creative design solutions for your brand." },
  { id: 5, title: "UI/UX Designer", content: "User-centered design for web and mobile applications." },
  { id: 6, title: "Content Writer", content: "Engaging content for your website and marketing materials." },
  { id: 7, title: "SEO Specialist", content: "Improve your website's visibility in search engines." },
  { id: 8, title: "Marketer", content: "Strategic marketing solutions to grow your business." },
  { id: 9, title: "Video Editor", content: "Professional video editing for your content." },
  { id: 10, title: "Consulting", content: "Expert advice for your business challenges." },
]

// Generate initial nodes
const generateInitialNodes = () => {
  const nodes: Node[] = []

  // Add navigation nodes
  navItems.forEach((item, index) => {
    nodes.push({
      id: item.id,
      type: "customNode",
      data: {
        label: item.label,
        active: item.active,
        type: "nav",
      },
      position: { x: 100 + index * 120, y: 50 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    })
  })

  // Add service item nodes
  serviceItems.forEach((item, index) => {
    nodes.push({
      id: `service-${item.id}`,
      type: "serviceItemNode",
      data: {
        id: item.id,
        title: item.title,
        active: [1, 2, 3].includes(item.id), // First 3 active by default
        content: item.content,
      },
      position: { x: 50, y: 150 + index * 60 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    })
  })

  // Add section nodes
  nodes.push({
    id: "services-section",
    type: "detailNode",
    data: {
      title: "Services",
      content: "Our comprehensive range of professional services.",
      visible: true,
    },
    position: { x: 400, y: 200 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  })

  nodes.push({
    id: "service-details",
    type: "detailNode",
    data: {
      title: "Service Details",
      content: "Detailed information about our professional services.",
      visible: false,
    },
    position: { x: 400, y: 350 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  })

  nodes.push({
    id: "portfolio-section",
    type: "detailNode",
    data: {
      title: "Portfolio",
      content: "Our collection of successful projects.",
      visible: true,
    },
    position: { x: 650, y: 250 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  })

  nodes.push({
    id: "portfolio-details",
    type: "detailNode",
    data: {
      title: "Portfolio Details",
      content: "Detailed information about our portfolio projects.",
      visible: false,
    },
    position: { x: 650, y: 400 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  })

  nodes.push({
    id: "blog-section",
    type: "detailNode",
    data: {
      title: "Blog",
      content: "Our latest articles and insights.",
      visible: true,
    },
    position: { x: 900, y: 300 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  })

  nodes.push({
    id: "blog-details",
    type: "detailNode",
    data: {
      title: "Blog Details",
      content: "Detailed information about our blog posts.",
      visible: false,
    },
    position: { x: 900, y: 450 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  })

  return nodes
}

// Generate initial edges
const generateInitialEdges = () => {
  const edges: Edge[] = []

  // Connect home to first 3 service items
  for (let i = 1; i <= 3; i++) {
    edges.push({
      id: `home-to-service-${i}`,
      source: "home",
      target: `service-${i}`,
      animated: true,
      style: { stroke: "#8b5cf6", strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#8b5cf6",
      },
    })
  }

  // Connect services to services section
  edges.push({
    id: "services-to-section",
    source: "services",
    target: "services-section",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#8b5cf6",
    },
  })

  // Connect portfolios to portfolio section
  edges.push({
    id: "portfolios-to-section",
    source: "portfolios",
    target: "portfolio-section",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#8b5cf6",
    },
  })

  // Connect blog to blog section
  edges.push({
    id: "blog-to-section",
    source: "blog",
    target: "blog-section",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#8b5cf6",
    },
  })

  return edges
}

export default function InteractiveDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(generateInitialNodes())
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateInitialEdges())
  const [activeSection, setActiveSection] = useState<string>("home")

  // Handle node click
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Handle navigation node clicks
      if (node.data.type === "nav") {
        const navId = node.id
        setActiveSection(navId)

        // Update active state for nav nodes
        setNodes((nds) =>
          nds.map((n) => {
            if (n.data.type === "nav") {
              return {
                ...n,
                data: {
                  ...n.data,
                  active: n.id === navId || ["home", "services", "portfolios"].includes(n.id),
                },
              }
            }
            return n
          }),
        )

        // Update edges based on active nav
        updateEdgesForNav(navId)

        // Update visibility of detail nodes
        updateDetailNodesVisibility(navId)
      }

      // Handle service item node clicks
      if (node.type === "serviceItemNode") {
        const serviceId = Number.parseInt(node.id.split("-")[1])

        if (activeSection === "home") {
          // Toggle service item active state
          setNodes((nds) =>
            nds.map((n) => {
              if (n.id === node.id) {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    active: !n.data.active,
                  },
                }
              }
              return n
            }),
          )

          // Update edges for service items
          updateEdgesForServiceItem(serviceId, !node.data.active)
        } else if (activeSection === "services") {
          // Show service details
          setNodes((nds) =>
            nds.map((n) => {
              if (n.id === "service-details") {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    visible: true,
                    title: `${node.data.title} Details`,
                    content: node.data.content,
                  },
                }
              }
              return n
            }),
          )

          // Add edge from services section to service details if not exists
          const edgeExists = edges.some((e) => e.id === "services-section-to-details")
          if (!edgeExists) {
            setEdges((eds) => [
              ...eds,
              {
                id: "services-section-to-details",
                source: "services-section",
                target: "service-details",
                animated: true,
                style: { stroke: "#8b5cf6", strokeWidth: 2 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: "#8b5cf6",
                },
              },
            ])
          }
        }
      }

      // Handle detail node clicks
      if (node.type === "detailNode") {
        if (node.id === "services-section") {
          // Show service details
          setNodes((nds) =>
            nds.map((n) => {
              if (n.id === "service-details") {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    visible: true,
                  },
                }
              }
              return n
            }),
          )

          // Add edge from services section to service details if not exists
          const edgeExists = edges.some((e) => e.id === "services-section-to-details")
          if (!edgeExists) {
            setEdges((eds) => [
              ...eds,
              {
                id: "services-section-to-details",
                source: "services-section",
                target: "service-details",
                animated: true,
                style: { stroke: "#8b5cf6", strokeWidth: 2 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: "#8b5cf6",
                },
              },
            ])
          }
        }

        if (node.id === "portfolio-section") {
          // Show portfolio details
          setNodes((nds) =>
            nds.map((n) => {
              if (n.id === "portfolio-details") {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    visible: true,
                  },
                }
              }
              return n
            }),
          )

          // Add edge from portfolio section to portfolio details if not exists
          const edgeExists = edges.some((e) => e.id === "portfolio-section-to-details")
          if (!edgeExists) {
            setEdges((eds) => [
              ...eds,
              {
                id: "portfolio-section-to-details",
                source: "portfolio-section",
                target: "portfolio-details",
                animated: true,
                style: { stroke: "#8b5cf6", strokeWidth: 2 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: "#8b5cf6",
                },
              },
            ])
          }
        }

        if (node.id === "blog-section") {
          // Show blog details
          setNodes((nds) =>
            nds.map((n) => {
              if (n.id === "blog-details") {
                return {
                  ...n,
                  data: {
                    ...n.data,
                    visible: true,
                  },
                }
              }
              return n
            }),
          )

          // Add edge from blog section to blog details if not exists
          const edgeExists = edges.some((e) => e.id === "blog-section-to-details")
          if (!edgeExists) {
            setEdges((eds) => [
              ...eds,
              {
                id: "blog-section-to-details",
                source: "blog-section",
                target: "blog-details",
                animated: true,
                style: { stroke: "#8b5cf6", strokeWidth: 2 },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color: "#8b5cf6",
                },
              },
            ])
          }
        }
      }
    },
    [activeSection, edges, setEdges, setNodes],
  )

  // Update edges for navigation
  const updateEdgesForNav = (navId: string) => {
    // Remove all edges except the permanent ones
    const permanentEdges = edges.filter(
      (edge) =>
        edge.id === "services-to-section" || edge.id === "portfolios-to-section" || edge.id === "blog-to-section",
    )

    const newEdges = [...permanentEdges]

    // Add edges based on active nav
    if (navId === "home") {
      // Get active service items
      const activeServiceNodes = nodes.filter((n) => n.type === "serviceItemNode" && n.data.active)

      // Add edges from home to active service items
      activeServiceNodes.forEach((node) => {
        const serviceId = Number.parseInt(node.id.split("-")[1])
        newEdges.push({
          id: `home-to-service-${serviceId}`,
          source: "home",
          target: `service-${serviceId}`,
          animated: true,
          style: { stroke: "#8b5cf6", strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#8b5cf6",
          },
        })
      })
    }

    setEdges(newEdges)
  }

  // Update edges for service item
  const updateEdgesForServiceItem = (serviceId: number, isActive: boolean) => {
    if (isActive) {
      // Add edge from home to service item
      setEdges((eds) => [
        ...eds,
        {
          id: `home-to-service-${serviceId}`,
          source: "home",
          target: `service-${serviceId}`,
          animated: true,
          style: { stroke: "#8b5cf6", strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#8b5cf6",
          },
        },
      ])
    } else {
      // Remove edge from home to service item
      setEdges((eds) => eds.filter((e) => e.id !== `home-to-service-${serviceId}`))
    }
  }

  // Update visibility of detail nodes
  const updateDetailNodesVisibility = (navId: string) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === "service-details") {
          return {
            ...n,
            data: {
              ...n.data,
              visible: false,
            },
          }
        }
        if (n.id === "portfolio-details") {
          return {
            ...n,
            data: {
              ...n.data,
              visible: false,
            },
          }
        }
        if (n.id === "blog-details") {
          return {
            ...n,
            data: {
              ...n.data,
              visible: false,
            },
          }
        }
        return n
      }),
    )

    // Remove detail connection edges
    setEdges((eds) =>
      eds.filter(
        (e) =>
          e.id !== "services-section-to-details" &&
          e.id !== "portfolio-section-to-details" &&
          e.id !== "blog-section-to-details",
      ),
    )
  }

  // Adjust layout for responsive design
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768

      setNodes((nds) => {
        return nds.map((node) => {
          // Adjust navigation nodes
          if (node.data.type === "nav") {
            const index = navItems.findIndex((item) => item.id === node.id)
            return {
              ...node,
              position: isMobile
                ? { x: 50 + (index % 3) * 100, y: 50 + Math.floor(index / 3) * 60 }
                : { x: 100 + index * 120, y: 50 },
            }
          }

          // Adjust other nodes based on screen size
          if (node.id === "services-section") {
            return {
              ...node,
              position: isMobile ? { x: 200, y: 200 } : { x: 400, y: 200 },
            }
          }

          if (node.id === "service-details") {
            return {
              ...node,
              position: isMobile ? { x: 200, y: 350 } : { x: 400, y: 350 },
            }
          }

          if (node.id === "portfolio-section") {
            return {
              ...node,
              position: isMobile ? { x: 350, y: 250 } : { x: 650, y: 250 },
            }
          }

          if (node.id === "portfolio-details") {
            return {
              ...node,
              position: isMobile ? { x: 350, y: 400 } : { x: 650, y: 400 },
            }
          }

          if (node.id === "blog-section") {
            return {
              ...node,
              position: isMobile ? { x: 500, y: 300 } : { x: 900, y: 300 },
            }
          }

          if (node.id === "blog-details") {
            return {
              ...node,
              position: isMobile ? { x: 500, y: 450 } : { x: 900, y: 450 },
            }
          }

          return node
        })
      })
    }

    // Initial layout adjustment
    handleResize()

    // Add resize listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [setNodes])

  return (
    <div className="w-full h-[700px] bg-[#1a1025] rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background color="#6d28d9" gap={16} size={1} />
        <Controls className="bg-[#1e1433] text-white border-[#2a1c45]" />
        <MiniMap
          nodeColor={(node) => {
            if (node.data?.active) return "#8b5cf6"
            return "#2a1c45"
          }}
          maskColor="rgba(26, 16, 37, 0.7)"
          style={{ backgroundColor: "#1e1433" }}
        />
      </ReactFlow>
    </div>
  )
}

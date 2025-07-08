"use client"

import { useEffect, useState } from "react"
import HistoryCard from "../../HistoryCard"
import type { Main, Debug, ConsultElement } from "@/components/types/activity"
import { perform_get } from "@/lib/api"
import Cookies from "js-cookie"
import { Button, Input, Popover, PopoverTrigger, PopoverContent, Checkbox, CheckboxGroup, Badge } from "@heroui/react"
import { Search, Filter, X } from "lucide-react"
import { useTheme } from "next-themes"

export const GetUserActivityHistoryTab = () => {
  const [activity, setActivity] = useState<Main>()
  const [filteredItems, setFilteredItems] = useState<(Debug | ConsultElement)[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [requestTypeFilters, setRequestTypeFilters] = useState<string[]>(["all"])
  const [directionFilters, setDirectionFilters] = useState<string[]>(["all"])
  const [statusFilters, setStatusFilters] = useState<string[]>(["all"])
  const { theme } = useTheme()

  const isDarkMode = theme === "dark"

  useEffect(() => {
    const token = Cookies.get("token")

    const getData = async () => {
      setIsLoading(true)
      try {
        const response = await perform_get("api/v1/report/user_report/", token)
        setActivity(response)
      } catch (error) {
        console.error("Error fetching activity data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    if (!activity) return

    let items: (Debug | ConsultElement)[] = []

    // Check if "all" is selected for direction
    const allDirections = directionFilters.includes("all")

    // Apply direction filter
    if (allDirections || directionFilters.includes("incoming")) {
      // Check if "all" is selected for request type
      const allRequestTypes = requestTypeFilters.includes("all")

      // Apply request type filter
      if (allRequestTypes || requestTypeFilters.includes("debug")) {
        items = [...items, ...activity.incoming_request.debug]
      }
      if (allRequestTypes || requestTypeFilters.includes("consult")) {
        items = [...items, ...activity.incoming_request.consult]
      }
    }

    if (allDirections || directionFilters.includes("my")) {
      // Check if "all" is selected for request type
      const allRequestTypes = requestTypeFilters.includes("all")

      // Apply request type filter
      if (allRequestTypes || requestTypeFilters.includes("debug")) {
        items = [...items, ...activity.my_requests.debug]
      }
      if (allRequestTypes || requestTypeFilters.includes("consult")) {
        items = [...items, ...activity.my_requests.consult]
      }
    }

    // Apply status filter
    const allStatuses = statusFilters.includes("all")
    if (!allStatuses) {
      items = items.filter((item) => {
        return statusFilters.includes(item.status)
      })
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      items = items.filter(
        (item) => item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
      )
    }

    setFilteredItems(items)
  }, [activity, requestTypeFilters, directionFilters, statusFilters, searchTerm])

  // Handle checkbox group changes
  const handleRequestTypeChange = (values: string[]) => {
    if (values.includes("all") && !requestTypeFilters.includes("all")) {
      // If "all" is newly selected, only keep "all"
      setRequestTypeFilters(["all"])
    } else if (requestTypeFilters.includes("all") && values.length > 0 && !values.includes("all")) {
      // If "all" was previously selected and now other options are selected
      setRequestTypeFilters(values.filter((v) => v !== "all"))
    } else if (values.length === 0) {
      // If no options are selected, default to "all"
      setRequestTypeFilters(["all"])
    } else {
      // Normal case: update with selected values
      setRequestTypeFilters(values)
    }
  }

  const handleDirectionChange = (values: string[]) => {
    if (values.includes("all") && !directionFilters.includes("all")) {
      // If "all" is newly selected, only keep "all"
      setDirectionFilters(["all"])
    } else if (directionFilters.includes("all") && values.length > 0 && !values.includes("all")) {
      // If "all" was previously selected and now other options are selected
      setDirectionFilters(values.filter((v) => v !== "all"))
    } else if (values.length === 0) {
      // If no options are selected, default to "all"
      setDirectionFilters(["all"])
    } else {
      // Normal case: update with selected values
      setDirectionFilters(values)
    }
  }

  const handleStatusChange = (values: string[]) => {
    if (values.includes("all") && !statusFilters.includes("all")) {
      // If "all" is newly selected, only keep "all"
      setStatusFilters(["all"])
    } else if (statusFilters.includes("all") && values.length > 0 && !values.includes("all")) {
      // If "all" was previously selected and now other options are selected
      setStatusFilters(values.filter((v) => v !== "all"))
    } else if (values.length === 0) {
      // If no options are selected, default to "all"
      setStatusFilters(["all"])
    } else {
      // Normal case: update with selected values
      setStatusFilters(values)
    }
  }

  // Reset all filters
  const resetFilters = () => {
    setRequestTypeFilters(["all"])
    setDirectionFilters(["all"])
    setStatusFilters(["all"])
    setSearchTerm("")
  }

  // Get filter label
  const getFilterLabel = (type: string, value: string) => {
    if (value === "all") return ""

    const labels: Record<string, Record<string, string>> = {
      requestType: {
        debug: "دیباگ",
        consult: "مشاوره",
        private: "کلاس خصوصی",
        public: "کلاس عمومی",
      },
      direction: {
        incoming: "درخواست‌های دریافتی",
        my: "درخواست‌های من",
      },
      status: {
        pending: "در انتظار",
        close: "پایان یافته",
        open: "در حال انجام",
      },
    }

    return labels[type]?.[value] || value
  }

  // Remove a specific filter
  const removeFilter = (type: "requestType" | "direction" | "status", value: string) => {
    if (type === "requestType") {
      const newFilters = requestTypeFilters.filter((f) => f !== value)
      setRequestTypeFilters(newFilters.length ? newFilters : ["all"])
    } else if (type === "direction") {
      const newFilters = directionFilters.filter((f) => f !== value)
      setDirectionFilters(newFilters.length ? newFilters : ["all"])
    } else if (type === "status") {
      const newFilters = statusFilters.filter((f) => f !== value)
      setStatusFilters(newFilters.length ? newFilters : ["all"])
    }
  }

  // Get active filters for display
  const getActiveFilters = () => {
    const filters: { type: string; value: string }[] = []

    if (!requestTypeFilters.includes("all")) {
      requestTypeFilters.forEach((filter) => {
        filters.push({ type: "requestType", value: filter })
      })
    }

    if (!directionFilters.includes("all")) {
      directionFilters.forEach((filter) => {
        filters.push({ type: "direction", value: filter })
      })
    }

    if (!statusFilters.includes("all")) {
      statusFilters.forEach((filter) => {
        filters.push({ type: "status", value: filter })
      })
    }

    return filters
  }

  const activeFilters = getActiveFilters()
  const hasActiveFilters = activeFilters.length > 0 || searchTerm.trim() !== ""

  return (
    <div className={`w-full h-full box-border p-5`}>
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex flex-wrap gap-2 w-full">
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button
                variant="ghost"
                className={`flex items-center gap-2 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Filter className="h-5 w-5" />
                <span>فیلترها</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div
                className={`p-4 rounded-md shadow-lg border w-72 max-h-96 overflow-y-auto ${
                  isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2 text-right">نوع درخواست</h3>
                  <CheckboxGroup value={requestTypeFilters} onChange={handleRequestTypeChange} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="request-all"
                        value="all"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="request-all" className="text-sm cursor-pointer">
                        همه
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="request-debug"
                        value="debug"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="request-debug" className="text-sm cursor-pointer">
                        دیباگ
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="request-consult"
                        value="consult"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="request-consult" className="text-sm cursor-pointer">
                        مشاوره
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="request-private"
                        value="private"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="request-private" className="text-sm cursor-pointer">
                        کلاس خصوصی
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="request-public"
                        value="public"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="request-public" className="text-sm cursor-pointer">
                        کلاس عمومی
                      </label>
                    </div>
                  </CheckboxGroup>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2 text-right">جهت</h3>
                  <CheckboxGroup value={directionFilters} onChange={handleDirectionChange} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="direction-all"
                        value="all"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="direction-all" className="text-sm cursor-pointer">
                        همه
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="direction-incoming"
                        value="incoming"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="direction-incoming" className="text-sm cursor-pointer">
                        درخواست‌های دریافتی
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="direction-my"
                        value="my"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="direction-my" className="text-sm cursor-pointer">
                        درخواست‌های من
                      </label>
                    </div>
                  </CheckboxGroup>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2 text-right">وضعیت</h3>
                  <CheckboxGroup value={statusFilters} onChange={handleStatusChange} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="status-all"
                        value="all"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="status-all" className="text-sm cursor-pointer">
                        همه وضعیت‌ها
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="status-pending"
                        value="pending"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="status-pending" className="text-sm cursor-pointer">
                        در انتظار
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="status-close"
                        value="close"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="status-close" className="text-sm cursor-pointer">
                        پایان یافته
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="status-open"
                        value="open"
                        className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                      />
                      <label htmlFor="status-open" className="text-sm cursor-pointer">
                        در حال انجام
                      </label>
                    </div>
                  </CheckboxGroup>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Input
          className="max-w-xl"
            type="text"
            placeholder="جستجو در عنوان و توضیحات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
           
            startContent={<Search className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />}
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onPress={resetFilters}
              className={`${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              پاک کردن فیلترها
            </Button>
          )}
        </div>

        {/* Active filters display */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFilters.map((filter, index) => (
              <Badge
                key={`${filter.type}-${filter.value}-${index}`}
                className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                  isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"
                }`}
              >
                <span>{getFilterLabel(filter.type, filter.value)}</span>
                <button
                  onClick={() => removeFilter(filter.type as any, filter.value)}
                  className="ml-1 rounded-full p-0.5 hover:bg-opacity-20 hover:bg-black"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {searchTerm.trim() !== "" && (
              <Badge
                className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                  isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"
                }`}
              >
                <span>جستجو: {searchTerm}</span>
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 rounded-full p-0.5 hover:bg-opacity-20 hover:bg-black"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              isDarkMode ? "border-blue-400" : "border-blue-600"
            }`}
          ></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => <HistoryCard key={item.id} data={item} />)
          ) : (
            <div className={`col-span-3 text-center py-10 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              هیچ موردی یافت نشد
            </div>
          )}
        </div>
      )}
    </div>
  )
}

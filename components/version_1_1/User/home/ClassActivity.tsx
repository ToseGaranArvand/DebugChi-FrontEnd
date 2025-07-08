"use client"
import React, { type SVGProps, useEffect, useState } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  type Selection,
  type ChipProps,
  type SortDescriptor,
  Spinner,
} from "@heroui/react"
import ClassDetails from "./ClassDetails"
import { perform_get } from "@/lib/api"
import Cookies from "js-cookie"
import type { Main } from "@/components/types/classDetails"
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : ""
}

export const PlusIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  )
}

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  )
}

export const SearchIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export const columns = [
  { name: "شناسه کلاس", uid: "id", sortable: true },
  { name: "نام", uid: "name", sortable: true },
  { name: "تعداد شرکت کنندگان", uid: "age", sortable: true },
  { name: "عنوان کلاس", uid: "role", sortable: true },
  { name: "لینک برگزاری ", uid: "email" },
  { name: "نوع کلاس", uid: "status", sortable: true },
  { name: "عملیات", uid: "actions" },
  { name: "وضعیت", uid: "class_status" },
]

export const statusOptions = [
  { name: "کلاس خصوصی", uid: "کلاس خصوصی" },
  { name: "کلاس عمومی", uid: "کلاس عمومی" },
  //   {name: "Vacation", uid: "vacation"},
]

export const classOptions = [
  { name: "درحال برگزاری", uid: "درحال برگزاری" },
  { name: "تمام شده", uid: "تمام شده" },
  //   {name: "Vacation", uid: "vacation"},
]



const statusColorMap: Record<string, ChipProps["color"]> = {
  private: "success",
  public: "primary",
}
const statusActiveMap: Record<string, ChipProps["color"]> = {
  active: "success",
  deactive: "primary",
}

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "age", "actions", "class_status"]

// type ClassUser = (typeof users)[0]

export enum TypeClass {
  Private = "private",
  Public = "public",
}

export default function ClassActivities() {
  const token = Cookies.get("token")

  const [classData, setData] = useState<Main[]>([])
  const [isLoading, setloading] = useState(false)

  useEffect(() => {
    setloading(true)
    const fetchData = async () => {
      const response = await perform_get("api/v1/get_all_class/")
      if (response) {
        setData(response)
        setloading(false)
      } else setloading(false)
    }
    fetchData()
  }, [])

  const [isOpen, setOpen] = useState<boolean>(false)
  const [filterValue, setFilterValue] = React.useState("")
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  const [statusFilter, setStatusFilter] = React.useState<Selection>(new Set(["private", "public"]))
  const [activeFilter, setActiveFilter] = React.useState<Selection>(new Set(["active", "deactive"]))
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  })

  const [page, setPage] = React.useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredClasses = [...(classData || [])]

    if (hasSearchFilter) {
      filteredClasses = filteredClasses.filter(
        (item) =>
          item.class_title.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.educational_heading.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }

    if (statusFilter !== "all" && Array.from(statusFilter).length > 0) {
      filteredClasses = filteredClasses.filter((item) => {
        const status = item.type_class === TypeClass.Private ? "private" : "public"
        return Array.from(statusFilter).includes(status)
      })
    }

    if (activeFilter !== "all" && Array.from(activeFilter).length > 0) {
      filteredClasses = filteredClasses.filter((item) => {
        const isActive = item.end_date ? new Date(item.end_date) > new Date() : true
        const status = isActive ? "active" : "deactive"
        return Array.from(activeFilter).includes(status)
      })
    }

    return filteredClasses
  }, [classData, filterValue, statusFilter, activeFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Main, b: Main) => {
      const first = a[sortDescriptor.column as keyof Main]
      const second = b[sortDescriptor.column as keyof Main]

      // Handle different types of values
      if (typeof first === "string" && typeof second === "string") {
        return sortDescriptor.direction === "descending" ? second.localeCompare(first) : first.localeCompare(second)
      } else if (typeof first === "number" && typeof second === "number") {
        return sortDescriptor.direction === "descending" ? second - first : first - second
      } else if (first instanceof Date && second instanceof Date) {
        return sortDescriptor.direction === "descending"
          ? second.getTime() - first.getTime()
          : first.getTime() - second.getTime()
      }

      return 0
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback((item: Main, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <p>{item.id}</p>
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: item.images && item.images.length > 0 ? item.images[0].image : "/user.jpg" }}
            description={item.educational_heading.substring(0,15)+ " ..."}
            name={item.class_title}
          >
            {item.educational_heading}
          </User>
        )
      case "age":
        return <p>{item.users ? item.users.length : 0}</p>
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{item.class_title}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{item.educational_heading.substring(0,15)+" ..."}</p>
          </div>
        )
      case "email":
        return <p>{item.class_session}</p>
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[item.type_class]} size="sm" variant="flat">
            {item.type_class === TypeClass.Private ? "خصوصی" : "عمومی"}
          </Chip>
        )
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <ClassDetails  details={item}/>
          </div>
        )
      case "class_status":
        const isActive = item.end_date ? new Date(item.end_date) > new Date() : true
        return (
          <Chip className="capitalize" color={isActive ? "success" : "primary"} size="sm" variant="flat">
            {isActive ? "درحال برگزاری" : "تمام شده"}
          </Chip>
        )
      default:
        // Convert any value to a string to ensure it's a valid React node
        const value = item[columnKey as keyof Main]
        if (value === null || value === undefined) {
          return <p>-</p>
        }
        if (value instanceof Date) {
          return <p>{value.toLocaleDateString()}</p>
        }
        if (typeof value === "object") {
          return <p>{JSON.stringify(value)}</p>
        }
        return <p>{String(value)}</p>
    }
  }, [])

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(10)
    setPage(1)
  }, [])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue("")
    }
  }, [])

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4" dir="ltr">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            dir="rtl"
            className="w-full sm:max-w-[44%]"
            placeholder="جستجو..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  نوع کلاس
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                <DropdownItem key="private" className="capitalize">
                  کلاس خصوصی
                </DropdownItem>
                <DropdownItem key="public" className="capitalize">
                  کلاس عمومی
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  وضعیت کلاس
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Activity"
                closeOnSelect={false}
                selectedKeys={activeFilter}
                selectionMode="multiple"
                onSelectionChange={setActiveFilter}
              >
                <DropdownItem key="active" className="capitalize">
                  درحال برگزاری
                </DropdownItem>
                <DropdownItem key="deactive" className="capitalize">
                  تمام شده
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              variant="flat"
              onPress={() => {
                setStatusFilter(new Set(["private", "public"]))
                setActiveFilter(new Set(["active", "deactive"]))
                setFilterValue("")
              }}
            >
              بازنشانی فیلترها
            </Button>
          </div>
        </div>
      </div>
    )
  }, [
    filterValue,
    statusFilter,
    activeFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    // users.length,
    hasSearchFilter,
  ])

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center" dir="ltr">
        <Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={setPage} />
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <span>در حال بارگزاری</span>
        <Spinner color="primary" variant="wave" />
      </div>
    )
  }

  return (
    <Table
      dir="ltr"
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[600px] bg-transparent shadow-none",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"هیچ کلاسی یافت نشد"} items={sortedItems} className="flex-1">
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  )
}

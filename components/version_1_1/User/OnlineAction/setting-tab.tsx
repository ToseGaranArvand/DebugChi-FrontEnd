"use client"

import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RangeCalendar,
  Switch,
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react"
import { useState } from "react"

const SettingTabContent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("فارسی")
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Tehran")
  const [selectedFont, setSelectedFont] = useState("ایران‌سنس")
  const [selectedFontSize, setSelectedFontSize] = useState("متوسط")
  const [selectedAIModel, setSelectedAIModel] = useState("GPT-3.5")
  const [selectedDataRetention, setSelectedDataRetention] = useState("3 ماه")
  const [darkMode, setDarkMode] = useState(true)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [passwordChanged, setPasswordChanged] = useState(false)

  const handlePasswordChange = () => {
    setPasswordChanged(true)
    onOpen()
  }

  return (
    <div className="w-full mx-auto px-4">

      <Tabs
        aria-label="Settings"
        variant="underlined"
      >
        <Tab
          key="notifications"
          title={
            <div className="flex items-center gap-2 flex-row-reverse">
              <span>نوتیفیکیشن</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
          }
        >
          <Card className="shadow-sm border-2 border-gray-100">
            <CardBody className="flex flex-col gap-6 p-6">
              <div className="flex justify-between items-center">
                <Switch
                  defaultSelected
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">فعال‌سازی اعلان‌ها</h3>
                  <p className="text-sm text-gray-500">دریافت اعلان‌های مهم از سیستم</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Switch
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">دریافت ایمیل</h3>
                  <p className="text-sm text-gray-500">ارسال اعلان‌ها به ایمیل شما</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Switch
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">نوتیفیکیشن مرورگر</h3>
                  <p className="text-sm text-gray-500">نمایش اعلان‌ها در مرورگر</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Switch
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">نوتیفیکیشن پیام جدید</h3>
                  <p className="text-sm text-gray-500">اعلان دریافت پیام‌های جدید</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Profile Tab */}
        <Tab
          key="profile"
          title={
            <div className="flex items-center gap-2 flex-row-reverse">
              <span>پروفایل کاربر</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          }
        >
          <Card className="shadow-sm border-2 border-gray-100">
            <CardBody className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-right">زبان سیستم</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full justify-between"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      }
                    >
                      {selectedLanguage}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Language"
                    onAction={(key) => setSelectedLanguage(key === "fa" ? "فارسی" : "English")}
                  >
                    <DropdownItem key="fa">فارسی</DropdownItem>
                    <DropdownItem key="en">English</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  label="نام نمایشی"
                  placeholder="مثلاً علی احمدی"
                  labelPlacement="outside"
                  classNames={{
                    label: "text-right",
                    input: "text-right",
                  }}
                />
              </div>

              <div className="flex justify-between items-center">
                <Switch
                  defaultSelected
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">نمایش پروفایل عمومی</h3>
                  <p className="text-sm text-gray-500">پروفایل شما برای دیگران قابل مشاهده باشد</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-right">منطقه زمانی</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full justify-between"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      }
                    >
                      {selectedTimezone}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Timezone"
                    onAction={(key) => {
                      if (key === "tehran") setSelectedTimezone("Asia/Tehran")
                      else if (key === "gmt") setSelectedTimezone("GMT")
                      else setSelectedTimezone("UTC")
                    }}
                  >
                    <DropdownItem key="tehran">Asia/Tehran</DropdownItem>
                    <DropdownItem key="gmt">GMT</DropdownItem>
                    <DropdownItem key="utc">UTC</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Security Tab */}
        <Tab
          key="security"
          title={
            <div className="flex items-center gap-2 flex-row-reverse">
              <span>امنیت و ورود</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          }
        >
          <Card className="shadow-sm border-2 border-gray-100">
            <CardBody className="flex flex-col gap-6 p-6">
              <div className="flex justify-between items-center">
                <Switch
                  defaultSelected
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">فعال‌سازی احراز هویت دو مرحله‌ای</h3>
                  <p className="text-sm text-gray-500">افزایش امنیت حساب کاربری</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  type="password"
                  label="تغییر رمز عبور"
                  placeholder="رمز جدید"
                  labelPlacement="outside"
                  classNames={{
                    label: "text-right",
                    input: "text-right",
                  }}
                  endContent={
                    <Button color="primary" size="sm" className="ml-1" onClick={handlePasswordChange}>
                      ذخیره
                    </Button>
                  }
                />
              </div>

              <div className="flex justify-between items-center">
                <Switch
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">ورود خودکار در دستگاه‌های قابل‌اعتماد</h3>
                  <p className="text-sm text-gray-500">ذخیره اطلاعات ورود در دستگاه‌های شخصی</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Appearance Tab */}
        <Tab
          key="appearance"
          title={
            <div className="flex items-center gap-2 flex-row-reverse">
              <span>ظاهر</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>
          }
        >
          <Card className="shadow-sm border-2 border-gray-100">
            <CardBody className="flex flex-col gap-6 p-6">
              <div className="flex justify-between items-center">
                <Switch
                  defaultSelected={darkMode}
                  onValueChange={setDarkMode}
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">تم تاریک</h3>
                  <p className="text-sm text-gray-500">استفاده از رنگ‌های تیره برای محیط کاربری</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-right">انتخاب فونت</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full justify-between"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      }
                    >
                      {selectedFont}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    onAction={(key) => {
                      if (key === "iransans") setSelectedFont("ایران‌سنس")
                      else if (key === "yekan") setSelectedFont("یکان")
                      else setSelectedFont("وزیر")
                    }}
                  >
                    <DropdownItem key="iransans">ایران‌سنس</DropdownItem>
                    <DropdownItem key="yekan">یکان</DropdownItem>
                    <DropdownItem key="vazir">وزیر</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-right">سایز نوشته</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full justify-between"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      }
                    >
                      {selectedFontSize}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    onAction={(key) => {
                      if (key === "sm") setSelectedFontSize("کوچک")
                      else if (key === "md") setSelectedFontSize("متوسط")
                      else setSelectedFontSize("بزرگ")
                    }}
                  >
                    <DropdownItem key="sm">کوچک</DropdownItem>
                    <DropdownItem key="md">متوسط</DropdownItem>
                    <DropdownItem key="lg">بزرگ</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* AI Settings Tab */}
        <Tab
          key="ai"
          title={
            <div className="flex items-center gap-2 flex-row-reverse">
              <span>هوش مصنوعی</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
              </svg>
            </div>
          }
        >
          <Card className="shadow-sm border-2 border-gray-100">
            <CardBody className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-right">انتخاب مدل</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full justify-between"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      }
                    >
                      {selectedAIModel}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    onAction={(key) => {
                      if (key === "gpt-3.5") setSelectedAIModel("GPT-3.5")
                      else setSelectedAIModel("GPT-4")
                    }}
                  >
                    <DropdownItem key="gpt-3.5">GPT-3.5</DropdownItem>
                    <DropdownItem key="gpt-4">GPT-4</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="flex justify-between items-center">
                <Switch
                  defaultSelected
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">ذخیره تاریخچه چت</h3>
                  <p className="text-sm text-gray-500">نگهداری سوابق گفتگوهای قبلی</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Switch
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">فعال‌سازی پاسخ خلاقانه</h3>
                  <p className="text-sm text-gray-500">افزایش خلاقیت در پاسخ‌های هوش مصنوعی</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-right">تنظیم دقت پاسخ</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full justify-between"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      }
                    >
                      متوسط
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem key="low">پایین</DropdownItem>
                    <DropdownItem key="medium">متوسط</DropdownItem>
                    <DropdownItem key="high">زیاد</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* History Tab */}
        <Tab
          key="history"
          title={
            <div className="flex items-center gap-2 flex-row-reverse">
              <span>تاریخچه و داده‌ها</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          }
        >
          <Card className="shadow-sm border-2 border-gray-100">
            <CardBody className="flex flex-col gap-6 p-6">
              <div className="flex justify-between items-center">
                <Switch
                  defaultSelected
                  size="lg"
                  classNames={{
                    wrapper: "group-data-[selected=true]:bg-primary",
                  }}
                />
                <div className="text-right">
                  <h3 className="font-medium">ذخیره تاریخچه تعاملات</h3>
                  <p className="text-sm text-gray-500">نگهداری سوابق فعالیت‌های شما در سیستم</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-right">مدت نگهداری داده‌ها</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full justify-between"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      }
                    >
                      {selectedDataRetention}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    onAction={(key) => {
                      if (key === "1month") setSelectedDataRetention("1 ماه")
                      else if (key === "3months") setSelectedDataRetention("3 ماه")
                      else setSelectedDataRetention("برای همیشه")
                    }}
                  >
                    <DropdownItem key="1month">1 ماه</DropdownItem>
                    <DropdownItem key="3months">3 ماه</DropdownItem>
                    <DropdownItem key="forever">برای همیشه</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <Button color="danger" variant="flat" className="mt-4">
                پاک کردن تمام داده‌های من
              </Button>
            </CardBody>
          </Card>
        </Tab>

        {/* General Tab */}
        <Tab
          key="general"
          title={
            <div className="flex items-center gap-2 flex-row-reverse">
              <span>عمومی</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
          }
        >
          <Card className="shadow-sm border-2 border-gray-100">
            <CardBody className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <CheckboxGroup
                  label="شهرهای مورد علاقه"
                  classNames={{
                    label: "text-right font-medium mb-2",
                  }}
                >
                  <div className="flex flex-col gap-2 items-end">
                    <Checkbox value="tehran">تهران</Checkbox>
                    <Checkbox value="shiraz">شیراز</Checkbox>
                    <Checkbox value="tabriz">تبریز</Checkbox>
                  </div>
                </CheckboxGroup>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium mb-2 block text-right">بازه تاریخی فعالیت‌ها</label>
                <div className="flex justify-center">
                  <RangeCalendar
                    showMonthAndYearPickers
                    aria-label="Date Range Picker"
                    classNames={{
                      base: "border rounded-lg p-4",
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* About Tab */}
        <Tab
          key="about"
          title={
            <div className="flex items-center gap-2 flex-row-reverse">
              <span>درباره ما</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
          }
        >
          <Card className="shadow-sm border-2 border-gray-100">
            <CardBody className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-right">اطلاعات بیشتر</label>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-full justify-between"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      }
                    >
                      درباره تیم ما
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem key="team">اعضای تیم</DropdownItem>
                    <DropdownItem key="contact">تماس با ما</DropdownItem>
                    <DropdownItem key="faq">سؤالات متداول</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-right text-gray-700 leading-relaxed">
                  این پلتفرم توسط تیمی از توسعه‌دهندگان و طراحان ایرانی ساخته شده است. ما متعهد به ارائه بهترین تجربه
                  کاربری و خدمات به کاربران خود هستیم.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button color="primary" size="sm">
                    تماس با پشتیبانی
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Password Change Success Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="text-right">تغییر رمز عبور</ModalHeader>
          <ModalBody className="text-right">
            <p>رمز عبور شما با موفقیت تغییر کرد.</p>
          </ModalBody>
          <ModalFooter className="justify-start">
            <Button color="primary" onPress={onClose}>
              تایید
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SettingTabContent

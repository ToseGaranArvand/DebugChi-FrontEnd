// import { Accordion, AccordionItem, Button, CalendarDate, Checkbox, DatePicker, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NumberInput, TimeInput } from '@heroui/react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { I18nProvider, useDateFormatter } from "@react-aria/i18n";

// import React, { useState } from 'react'
// import { getLocalTimeZone, Time } from '@internationalized/date';

// type Props = {}
// interface EditedRequest {
//   debug: {
//     is_chat: boolean;
//     is_voice: boolean;
//     is_video: boolean;
//     session_number?: number;
//     session_time?: number;
//     session_hours?: number;
//     session_minutes?: number;
//   };
//   moshaver: {
//     is_chat: boolean;
//     is_voice: boolean;
//     is_video: boolean;
//     session_number?: number;
//     session_time?: number;
//     session_hours?: number;
//     session_minutes?: number;
//   };
//   class: {
//     session_number: number;
//     session_time: number;
//     session_hours?: number;
//     session_minutes?: number;
//   };
//   date: string;
// }

// const SetService = (props: Props) => {
//       const [isOpen, setIsOpen] = useState<boolean>(false);
    
//   const [edited_request, setRequest] = useState<EditedRequest>({
//     moshaver: {
//       is_chat: false,
//       is_video: false,
//       is_voice: false,
//       session_hours: 1,
//       session_minutes: 0,
//     },
//     debug: {
//       is_chat: false,
//       is_video: false,
//       is_voice: false,
//       session_hours: 1,
//       session_minutes: 0,
//     },
//     class: {
//       session_number: 0,
//       session_time: 0,
//       session_hours: 1,
//       session_minutes: 0,
//     },
//     date: _time.toString(),
//   });


//     const updateDateTime = (date: CalendarDate, time: Time) => {
//       try {
//         const dateTime = date.toDate(getLocalTimeZone());
//         dateTime.setHours(time.hour);
//         dateTime.setMinutes(time.minute);
  
//         const formattedDateTime = `${dateFormatter.format(
//           dateTime
//         )} ${timeFormatter.format(dateTime)}`;
  
//         setRequest((prev) => ({
//           ...prev,
//           date: formattedDateTime,
//           time: timeFormatter.format(dateTime),
//         }));
//       } catch (error) {
//         console.error("Error updating date and time:", error);
//       }
//     };
  
//     const sendMessage = async () => {
//       const response = await perform_post("api/v1/lock-session/", {
//         session_id: data.session_id,
//       });
  
//       const _data = {
//         session_id: data.session_id,
//         sender: data.debuger.uuid || data.consult.uuid,
//         receiver: data.debuger_applicator.uuid || data.consult_applicator.uuid,
//         data: {
//           type: "payment",
//           data: edited_request,
//           created_at: String(new Date()),
//           status: "pending",
//         },
//       };
//       if (response.success) {
//         dispatch(setMessage(_data));
//         socket.emit("test_message", _data);
//         socket.emit("lock_session", data.session_id);
//       } else {
//         addToast({
//           title: "خطا",
//           description: "ارسال اطلاعات با خطا مواجه شد",
//           color: "danger",
//         });
//       }
//     };



//   const handleEditRequest = (
//     action: string,
//     value?: boolean | CalendarDate | Time | number,
//     session_number?: number
//   ) => {
//     if (action === "debug_voice") {
//       setRequest((prev) => ({
//         ...prev,
//         debug: { ...prev.debug, is_voice: !prev.debug.is_voice },
//       }));
//     }
//     if (action === "debug_video") {
//       setRequest((prev) => ({
//         ...prev,
//         debug: { ...prev.debug, is_video: !prev.debug.is_video },
//       }));
//     }
//     if (action === "moshaver_voice") {
//       setRequest((prev) => ({
//         ...prev,
//         moshaver: { ...prev.moshaver, is_voice: !prev.moshaver.is_voice },
//       }));
//     }
//     if (action === "moshaver_video") {
//       setRequest((prev) => ({
//         ...prev,
//         moshaver: { ...prev.moshaver, is_video: !prev.moshaver.is_video },
//       }));
//     }

//     if (action === "date" && value instanceof CalendarDate) {
//       setSelectedDate(value);
//       updateDateTime(value, selectedTime);
//     }

//     if (action === "time" && value instanceof Time) {
//       setSelectedTime(value);
//       updateDateTime(selectedDate, value);
//     }
//     if (action === "set_debug_session" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         debug: { ...prev.debug, session_number: value },
//       }));
//     }
//     if (action === "set_debug_time" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         debug: { ...prev.debug, session_time: value },
//       }));
//     }
//     if (action === "set_moshaver_session" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         moshaver: { ...prev.moshaver, session_number: value },
//       }));
//     }
//     if (action === "set_moshaver_time" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         moshaver: { ...prev.moshaver, session_time: value },
//       }));
//     }
//     if (action === "set_class_session" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         class: { ...prev.class, session_number: value },
//       }));
//     }
//     if (action === "set_class_time" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         class: { ...prev.class, session_time: value },
//       }));
//     }

//     if (action === "set_debug_hours" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         debug: { ...prev.debug, session_hours: value },
//       }));
//     }
//     if (action === "set_debug_minutes" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         debug: { ...prev.debug, session_minutes: value },
//       }));
//     }
//     if (action === "set_moshaver_hours" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         moshaver: { ...prev.moshaver, session_hours: value },
//       }));
//     }
//     if (action === "set_moshaver_minutes" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         moshaver: { ...prev.moshaver, session_minutes: value },
//       }));
//     }
//     if (action === "set_class_hours" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         class: { ...prev.class, session_hours: value },
//       }));
//     }
//     if (action === "set_class_minutes" && typeof value === "number") {
//       setRequest((prev) => ({
//         ...prev,
//         class: { ...prev.class, session_minutes: value },
//       }));
//     }
//   };




//   return (
//     <Dropdown
//     isKeyboardDismissDisabled
    
//     className="w-96 ml-28  bg-default-100"
//     placement="bottom"
//     closeOnSelect={false}
//     isOpen={isOpen}
//     size="sm"
//     onOpenChange={setIsOpen}
//   >
//     <DropdownTrigger>
//       <Button
//         variant="solid"
//         color="default"
//         endContent={isOpen ? <ChevronUp /> : <ChevronDown />}
//       >
//         ست کردن خدمات
//       </Button>
//     </DropdownTrigger>
//     <DropdownMenu aria-label="Static Actions">
//       <DropdownItem variant="light" key="copy" dir="rtl">
//         <Accordion variant="splitted">
//           <AccordionItem
//             key="1"
//             aria-label="Accordion 1"
//             title="دیباگ"
//           >
//             <div className="flex gap-2 ">
//               <Checkbox
//                 isSelected={edited_request.debug.is_voice}
//                 onChange={() => handleEditRequest("debug_voice")}
//               >
//                 تماس صوتی
//               </Checkbox>
//               <Checkbox
//                 isSelected={edited_request.debug.is_video}
//                 onChange={() => handleEditRequest("debug_video")}
//               >
//                 تماس ویدیویی
//               </Checkbox>
//             </div>
//             <div className="h-4 w-full"></div>
//             <NumberInput
//               minValue={0}
//               defaultValue={0}
//               label="تعداد جلسات"
//               labelPlacement="outside"
//               onValueChange={(value) =>
//                 handleEditRequest("set_debug_session", value)
//               }
//             />
//             <div className="flex gap-2 items-center">
//               <NumberInput
//                 minValue={0}
//                 maxValue={24}
//                 defaultValue={1}
//                 label="ساعت"
//                 labelPlacement="outside"
//                 className="flex-1"
//                 onValueChange={(value) =>
//                   handleEditRequest("set_debug_hours", value)
//                 }
//               />
//               <NumberInput
//                 minValue={0}
//                 maxValue={59}
//                 defaultValue={0}
//                 label="دقیقه"
//                 labelPlacement="outside"
//                 className="flex-1"
//                 onValueChange={(value) =>
//                   handleEditRequest("set_debug_minutes", value)
//                 }
//               />
//             </div>
//           </AccordionItem>
//           <AccordionItem
//             key="2"
//             aria-label="Accordion 2"
//             title="مشاوره"
//           >
//             <div className="flex gap-2 mb-2">
//               <Checkbox
//                 isSelected={edited_request.moshaver.is_voice}
//                 onChange={() => handleEditRequest("moshaver_voice")}
//               >
//                 تماس صوتی
//               </Checkbox>

//               <Checkbox
//                 isSelected={edited_request.moshaver.is_video}
//                 onChange={() => handleEditRequest("moshaver_video")}
//               >
//                 تماس ویدیویی
//               </Checkbox>
//             </div>
//             <div className="h-4 w-full"></div>

//             <NumberInput
//               minValue={0}
//               defaultValue={0}
//               label="تعداد جلسات"
//               labelPlacement="outside"
//               onValueChange={(value) =>
//                 handleEditRequest("set_moshaver_session", value)
//               }
//             />
//             <div className="flex gap-2 items-center">
//               <NumberInput
//                 minValue={0}
//                 max={24}
//                 defaultValue={1}
//                 label="ساعت"
//                 labelPlacement="outside"
//                 className="flex-1"
//                 onValueChange={(value) =>
//                   handleEditRequest("set_moshaver_hours", value)
//                 }
//               />
//               <NumberInput
//                 minValue={0}
//                 max={59}
//                 defaultValue={0}
//                 label="دقیقه"
//                 labelPlacement="outside"
//                 className="flex-1"
//                 onValueChange={(value) =>
//                   handleEditRequest("set_moshaver_minutes", value)
//                 }
//               />
//             </div>
//           </AccordionItem>
//           <AccordionItem
//             key="3"
//             aria-label="Accordion 3"
//             title="برگزاری کلاس"
//           >
//             <NumberInput
//               minValue={0}
//               defaultValue={0}
//               label="تعداد جلسات"
//               labelPlacement="outside"
//               onValueChange={(value) =>
//                 handleEditRequest("set_class_session", value)
//               }
//             />
//             <div className="flex gap-2 items-center">
//               <NumberInput
//                 minValue={0}
//                 maxValue={24}
//                 defaultValue={1}
//                 label="ساعت"
//                 labelPlacement="outside"
//                 className="flex-1"
//                 onValueChange={(value) =>
//                   handleEditRequest("set_class_hours", value)
//                 }
//               />
//               <NumberInput
//                 minValue={0}
//                 maxValue={59}
//                 defaultValue={0}
//                 label="دقیقه"
//                 labelPlacement="outside"
//                 className="flex-1"
//                 onValueChange={(value) =>
//                   handleEditRequest("set_class_minutes", value)
//                 }
//               />
//             </div>

//             {/* می‌تونی اینجا چک‌باکس‌های مخصوص کلاس یا ورودی عددی اضافه کنی */}
//           </AccordionItem>
//         </Accordion>
//       </DropdownItem>

//       <DropdownItem key="time" variant="light">
//         <I18NProvider locale="fa-IR">
//           <div className="flex flex-col gap-2 ">
//             <DatePicker
//               hideTimeZone
//               showMonthAndYearPickers
//               aria-label="تاریخ جلسه"
//               defaultValue={selectedDate}
//               onChange={(date) => {
//                 if (date) {
//                   handleEditRequest("date", date);
//                 }
//               }}
//               label="تاریخ جلسه"
//               variant="flat"
//               color="default"
//             />

//             <TimeInput
//               label="زمان جلسه"
//               defaultValue={selectedTime}
//               onChange={(time) => {
//                 if (time) {
//                   handleEditRequest("time", time);
//                 }
//               }}
//               variant="flat"
//               color="default"
//             />
//           </div>
//         </I18nProvider>
//       </DropdownItem>
//       <DropdownItem key={"submit"} variant="light">
//         <Button
//           color="success"
//           variant="solid"
//           fullWidth
//           onPress={() => {
//             console.log("Full date and time:", edited_request);
//             setIsEdited(true);
//             setIsOpen(false);
//             sendMessage();
//             // Close the dropdown
//           }}
//         >
//           ست کردن
//         </Button>
//       </DropdownItem>
//     </DropdownMenu>
//   </Dropdown>
//   )
// }

// export default SetService
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@heroui/react";


type Props = {
    src:string;
    name:string
}

export default function ImageModal({src,name}:Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // تایپ‌های دقیق برای استیت‌ها
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dragging, setDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // زوم با اسکرول
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setScale((prev) => {
      const newScale =
        e.deltaY < 0 ? Math.min(prev + 0.2, 3) : Math.max(prev - 0.2, 1);
      return newScale;
    });
  };

  // شروع درگ
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // حرکت درگ
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  // توقف درگ
  const handleMouseUp = () => setDragging(false);

  // ریست مقادیر هنگام بسته شدن مدال
  const handleClose = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    onOpenChange();
  };

  return (
    <>
      <Image
        onClick={onOpen}
        alt={name}
        src={src}
        // width={300}
        className="cursor-pointer w-full"
      />
      <Modal isOpen={isOpen} onOpenChange={handleClose} size="5xl" hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody>
                <div
                  className="w-full h-full flex justify-center items-center overflow-hidden"
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp} // اگر موس از محدوده خارج شد، درگ متوقف شود
                >
                  <Image
                    alt="HeroUI hero Image"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    width={1000}
                    className="transition-transform duration-100 cursor-grab active:cursor-grabbing"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  بسنن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import { Dispatch, RefObject, SetStateAction } from "react";

interface IHandleOpenModalPropTypes {
  buttonRef?: RefObject<HTMLButtonElement | null>;
  setIsModalAbove?: Dispatch<SetStateAction<boolean>>;
  setModalTop: Dispatch<SetStateAction<number>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const handleOpenModal = ({
  buttonRef,
  setIsModalAbove,
  setModalTop,
  setIsModalOpen,
}: IHandleOpenModalPropTypes): void => {
  if (buttonRef?.current) {
    const rect = buttonRef?.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const modalHeight = 271;
    const spacing = -20;

    let topPosition = rect.bottom + scrollY + spacing;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (setIsModalAbove) {
      if (
        spaceBelow < modalHeight + spacing &&
        spaceAbove >= modalHeight + spacing
      ) {
        topPosition = rect.top + scrollY - modalHeight - spacing;
        setIsModalAbove(true);
      } else {
        setIsModalAbove(false);
      }
    }

    setModalTop(topPosition - scrollY);
    setIsModalOpen(true);
  }
};

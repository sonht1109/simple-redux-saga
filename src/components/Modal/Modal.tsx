import useDelayUnmount from 'hooks/useDelayUnmount';
import { ReactNode, useEffect } from 'react';
import { SModal } from './styles';

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
  title: string | ReactNode;
  children: ReactNode;
  renderClose?: ReactNode;
  className?: string;
}

const prefixCls = 'rc-md';

const Modal = (props: Props) => {
  const { children, isOpen, title, toggleModal, renderClose, className } =
    props;

  const { shouldRender } = useDelayUnmount(isOpen);

  const overlayAnimation = `${
    isOpen ? 'overlayEnter' : 'overlayLeave'
  } 0.2s ease-out forwards`;

  const modalContentAnimation = `${
    isOpen ? 'modalContentEnter' : 'modalContentLeave'
  } 0.2s ease-out forwards`;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    const listener = (e: Event) => {
      if ((e as unknown as KeyboardEvent).key === 'Escape' && isOpen) {
        toggleModal();
      }
    };
    document?.addEventListener('keydown', listener);

    return () => {
      document.body.style.overflow = 'auto';
      document?.removeEventListener('keydown', listener);
    };
  }, [isOpen, toggleModal]);

  if (!shouldRender) return <></>;

  return (
    <SModal {...{ className }}>
      <div
        className={`${prefixCls}__overlay`}
        style={{ animation: overlayAnimation }}
        onClick={toggleModal}
      ></div>
      <div
        className={`${prefixCls}__content`}
        style={{ animation: modalContentAnimation }}
      >
        <div className={`${prefixCls}__content-header`}>
          {title}
          <div className={`${prefixCls}__header-close`} onClick={toggleModal}>
            {renderClose || <CloseBtn />}
          </div>
        </div>

        <div className="md-content__container">{children}</div>
      </div>
    </SModal>
  );
};

export default Modal;
Modal.displayName = Modal;

const CloseBtn = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_118_8511)">
      <path
        d="M12.4512 -0.0488281C5.54752 -0.0488281 -0.0488281 5.54752 -0.0488281 12.4512C-0.0488281 19.3548 5.54752 24.9512 12.4512 24.9512C19.3548 24.9512 24.9512 19.3548 24.9512 12.4512C24.943 5.55096 19.3514 -0.0406265 12.4512 -0.0488281ZM12.4512 23.3887C6.4106 23.3887 1.51367 18.4917 1.51367 12.4512C1.51367 6.4106 6.4106 1.51367 12.4512 1.51367C18.4917 1.51367 23.3887 6.4106 23.3887 12.4512C23.3822 18.4891 18.4891 23.3822 12.4512 23.3887Z"
        fill="white"
      />
      <path
        d="M18.5278 6.37457C18.2226 6.06959 17.7281 6.06959 17.4231 6.37457L12.4512 11.3465L7.47931 6.37457C7.17947 6.06425 6.6849 6.05566 6.37457 6.3555C6.06425 6.65514 6.05566 7.14972 6.3555 7.46005C6.36179 7.46653 6.36809 7.47302 6.37457 7.47931L11.3465 12.4512L6.37457 17.4231C6.06425 17.7227 6.05566 18.2173 6.3555 18.5278C6.65514 18.8381 7.14972 18.8467 7.46005 18.5469C7.46653 18.5406 7.47302 18.5343 7.47931 18.5278L12.4512 13.5559L17.4231 18.5278C17.7334 18.8275 18.228 18.8189 18.5276 18.5086C18.82 18.2059 18.82 17.7258 18.5276 17.4231L13.5559 12.4512L18.5278 7.47931C18.8328 7.17432 18.8328 6.67975 18.5278 6.37457Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_118_8511">
        <rect width="25" height="25" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

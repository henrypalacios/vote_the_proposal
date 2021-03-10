import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Button, Icon, Image, Modal } from "semantic-ui-react";

function ModalScrolling(props) {
  const [open, setOpen] = React.useState(false);

  const successfulAction = () => {
    setOpen(false);
  };

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        successfulAction,
      });
    }

    return child;
  });

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={props.trigger}
      closeIcon
    >
      <Modal.Header>{props.textHeader}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{childrenWithProps}</Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

ModalScrolling.defaultProps = {
  trigger: <Button>Open Modal</Button>,
  textAction: "Proceed",
  textHeader: "Modal Header",
  onAction: () => console.log("OnAction"),
};

export default ModalScrolling;

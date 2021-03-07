import React from "react";
import { Button, Icon, Image, Modal } from "semantic-ui-react";

function ModalScrollingExample(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={props.trigger}
    >
      <Modal.Header>{props.textHeader}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{props.children}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => setOpen(false)}>
          {props.textAction} <Icon name="right chevron" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

ModalScrollingExample.defaultProps = {
  trigger: <Button>Open Modal</Button>,
  textAction: "Proceed",
  textHeader: "Modal Header",
};

export default ModalScrollingExample;

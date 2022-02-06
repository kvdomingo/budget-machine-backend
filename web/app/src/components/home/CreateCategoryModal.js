import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import {
  MDBBtn as Button,
  MDBInputGroup as InputGroup,
  MDBModal as Modal,
  MDBModalBody as ModalBody,
  MDBModalFooter as ModalFooter,
  MDBModalHeader as ModalHeader,
  MDBPopover as Popover,
  MDBPopoverBody as PopoverBody,
} from "mdbreact";
import api from "../../utils/Endpoints";

function randomHex() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function CreateCategoryModal({ open, setOpen }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(randomHex());
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setValid(!!name && !!color);
  }, [name, color]);

  function toggle() {
    setOpen(prevState => !prevState);
    setColor(randomHex());
    setName("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    api.data
      .createCategory({ name, color })
      .then(() => toggle())
      .catch(err => {
        console.error(err.message);
        setError(true);
      });
  }

  return (
    <Modal isOpen={open} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Create category</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <InputGroup hint="Name" value={name} onChange={e => setName(e.target.value)} size="md" className="mb-3" />
          <InputGroup
            hint="Color"
            outline
            value={color}
            onChange={e => setColor(e.target.value)}
            size="md"
            append={
              <Popover placement="bottom" popover clickable>
                <button
                  type="button"
                  className="btn m-0 p-0"
                  style={{
                    backgroundColor: color,
                    height: "100%",
                    width: "3em",
                    boxShadow: "none",
                    cursor: "pointer",
                  }}
                />
                <div>
                  <PopoverBody>
                    <ChromePicker
                      color={color}
                      onChange={color => setColor(color.hex)}
                      onChangeComplete={color => setColor(color.hex)}
                    />
                  </PopoverBody>
                </div>
              </Popover>
            }
          />
          {error && <div className="text-danger">'An error occurred'</div>}
        </ModalBody>
        <ModalFooter>
          <Button color="blue-grey" onClick={toggle}>
            Cancel
          </Button>
          <Button type="submit" disabled={!valid} color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

CreateCategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default CreateCategoryModal;

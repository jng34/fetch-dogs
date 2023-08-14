import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MatchProps } from "../utils/types";

export default function MatchModal({
  toggleMatch, setToggleMatch, dogMatch
}: MatchProps) {
  const navigate = useNavigate();
  return (
    <Modal show={toggleMatch} onHide={() => setToggleMatch(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Match me!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your dog is waiting for you!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setToggleMatch(false)}>Close</Button>
        <Button variant="primary" onClick={() => navigate("/adoption", { state: { dogMatch } })}>See Match</Button>
      </Modal.Footer>
    </Modal>
  )
}
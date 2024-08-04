import Switch from "react-switch";

const ToggleButton = ({ checked, onToggleChange }) => {
  return (
    <Switch
      onChange={onToggleChange} // Pass the new checked value directly to the parent's handler
      checked={checked} // Control the switch state based on the checked prop
      offColor="#888"
      onColor="#0f0"
      uncheckedIcon={false}
      checkedIcon={false}
    />
  );
};

export default ToggleButton;

// Key Points:
// The parent component determines the initial state of checked based on the API response.
// The child component uses the checked prop to control the visual state of the switch.
// When the switch is toggled, the onToggleChange handler in the child component passes the
// new state back to the parent component to update the overall state.

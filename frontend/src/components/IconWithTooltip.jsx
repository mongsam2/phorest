import styles from "../styles/Navbar.module.css";

const IconWithTooltip = ({ IconComponent, color, tooltipText }) => {
  return (
    <div className={styles.iconContainer}>
      <IconComponent color={color} />
      <div className={styles.tooltip}>{tooltipText}</div>
    </div>
  );
};

export default IconWithTooltip;

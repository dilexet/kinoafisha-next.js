export default function Timer({ minutes, seconds }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "25px",
          color: "rgba(255, 255, 255, 0.35)",
        }}
      >
        <span>{minutes >= 10 ? minutes : `0${minutes}`}</span>:
        <span>{seconds >= 10 ? seconds : `0${seconds}`}</span>
      </div>
    </div>
  );
}

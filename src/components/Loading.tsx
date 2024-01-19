import { MagnifyingGlass } from "react-loader-spinner";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyItems: "center",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "95vh",
        width: "100%",
      }}
    >
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
}

export default Loading;

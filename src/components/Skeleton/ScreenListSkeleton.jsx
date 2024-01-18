import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function TableRow() {
  return (
    <tr>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
    </tr>
  );
}

const ScreenListSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#cccccc"
      highlightColor="#ffffff"
      borderRadius="0.5rem"
      duration={4}
    >
      <table className="table">
        <thead>
          <tr>
            <th>Screen ID </th>
            <th>Screen Name</th>
            <th>Module ID</th>
            <th>Module Name</th>
            <th>Module Icon Name</th>
            <th>Module Icon</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5).keys()].map((u) => (
            <TableRow key={u} />
          ))}
        </tbody>
      </table>
    </SkeletonTheme>
  );
};

export default ScreenListSkeleton;

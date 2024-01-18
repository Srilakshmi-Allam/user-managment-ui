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
    </tr>
  );
}

const GroupListSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#cccccc"
      highlightColor="#ffffff"
      borderRadius="0.5rem"
      duration={4}
    >
      <table className="table ">
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Group Name</th>
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

export default GroupListSkeleton;

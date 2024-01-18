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

const UserListSkeleton = () => {
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
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Group</th>
            <th>Role</th>
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

export default UserListSkeleton;

// src/features/students/StudentTable.jsx
import { useGetStudentsQuery } from './studentsApi';
function StudentTable() {
    const {
        data: students = [],
        isLoading,
        isFetching,
        refetch,
    } = useGetStudentsQuery(undefined, {
        pollingInterval: 30_000, // re-fetch every 30 s
        refetchOnFocus: true, // re-fetch on window focus
        refetchOnReconnect: true, // re-fetch after reconnect
        refetchOnMountOrArgChange: true, // always fresh on mount
    });
    if (isLoading) return <p>Loading students...</p>;
    return (
        <div>
            {isFetching && <span className="badge">↻ Syncing...</span>}
            <button onClick={refetch}>↻ Refresh</button>
            <table>{/* ... student rows ... */}</table>
        </div>
    );
}
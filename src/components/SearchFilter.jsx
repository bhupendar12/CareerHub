export default function SearchFilter({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="flex gap-4 mb-6">

      <input
        type="text"
        placeholder="Search Company..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded-lg flex-1"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border p-3 rounded-lg"
      >
        <option value="">
          All Status
        </option>

        <option value="Applied">
          Applied
        </option>

        <option value="Interview">
          Interview
        </option>

        <option value="Selected">
          Selected
        </option>

        <option value="Rejected">
          Rejected
        </option>

      </select>

    </div>
  );
}
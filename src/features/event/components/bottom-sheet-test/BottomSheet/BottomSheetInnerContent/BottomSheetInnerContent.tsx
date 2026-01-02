export default function BottomSheetInnerContent() {
  return (
    <>
      <h3 className="mb-4 font-bold text-gray-500">상세 일정 목록</h3>
      <div className="space-y-4 pb-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
              {i + 1}
            </div>
            <div>
              <div className="font-bold text-gray-800">오후 2:00 - 4:00</div>
              <div className="text-sm text-gray-400">팀 미팅 및 기획 회의</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

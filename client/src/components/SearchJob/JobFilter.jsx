import { Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

// Danh sách mức lương - chỉnh sửa theo nhu cầu thực tế của bạn
const SALARY_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "1", label: "Dưới 10 triệu" },
  { value: "2", label: "10 - 15 triệu" },
  { value: "3", label: "15 - 20 triệu" },
  { value: "4", label: "20 - 30 triệu" },
  { value: "5", label: "Trên 30 triệu" }
];

const COMPANY_FIELD = [
  { label: 'Tất cả' },
  { label: 'Công nghệ thông tin' },
  { label: 'Tài chính - Ngân hàng' },
  { label: 'Bảo hiểm' },
  { label: 'Bất động sản' },
  { label: 'Giáo dục - Đào tạo' },
  { label: 'Y tế - Dược phẩm' },
  { label: 'Sản xuất - Chế biến' },
  { label: 'Xây dựng' },
  { label: 'Vận tải - Logistics' },
  { label: 'Bán lẻ - Thương mại' },
  { label: 'Hàng tiêu dùng nhanh (FMCG)' },
  { label: 'Marketing - Quảng cáo - PR' },
  { label: 'Truyền thông - Báo chí' },
  { label: 'Du lịch - Nhà hàng - Khách sạn' },
  { label: 'Nông - Lâm - Ngư nghiệp' },
  { label: 'Năng lượng - Điện - Dầu khí' },
  { label: 'Viễn thông' },
  { label: 'Ô tô - Xe máy' },
  { label: 'Pháp lý - Luật' },
  { label: 'Nhân sự - Tuyển dụng' },
  { label: 'Tư vấn' },
  { label: 'Thời trang - Làm đẹp' },
  { label: 'Thực phẩm - Đồ uống' },
  { label: 'Sản xuất' }
];

// Danh sách hình thức làm việc
const WORK_TYPE_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "full_time", label: "Toàn thời gian" },
  { value: "part_time", label: "Bán thời gian" },
  { value: "internship", label: "Thực tập" }
];

// Loại hình làm việc
const  WORK_ARRANGEMENT = [
  { value: 'all', label: 'Tất cả' },
  { value: 'on_site', label: 'Tại văn phòng' },
  { value: 'remote', label: 'Làm từ xa' },
  { value: 'hybrid', label: 'Hybrid' },
]

/**
 * Nhóm radio filter dùng chung cho cả 2 bộ lọc (lương / hình thức làm việc)
 */
function RadioFilterGroup({ title, name, options, value, onChange }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 accent-green-600 cursor-pointer"
            />
            <span
              className={`text-sm ${
                value === option.value
                  ? "text-green-600 font-medium"
                  : "text-gray-600 group-hover:text-green-600"
              }`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

/**
 * Sidebar lọc công việc theo mức lương + hình thức làm việc.
 * Gọi onFilterChange({ salary, workType }) mỗi khi người dùng đổi lựa chọn,
 * để component cha (trang danh sách job) dùng giá trị này gọi API.
 */
export default function JobFilter({ onFilterChange, name, location }) {

  const [salary, setSalary] = useState("all");
  const [workType, setWorkType] = useState("all");
  const [companyField, setCompanyField] = useState('all');
  const [workArrangement, setWorkArrangement] = useState('all');

  const handleSalaryChange = (newSalary) => {
    setSalary(newSalary);
    onFilterChange?.({ name, location, salary: newSalary, companyField, workType, workArrangement });
  };

  const handleWorkTypeChange = (newWorkType) => {
    setWorkType(newWorkType);
    onFilterChange?.({ name, location, salary, companyField, workType: newWorkType, workArrangement });
  };

  const handleCompanyField = (newField) => {
    setCompanyField(newField);
    onFilterChange?.({ name, location, salary, companyField: newField, workType, workArrangement });
  };

  const handleWorkArrangement = (newWorkArrangement) => {
    setWorkArrangement(newWorkArrangement);
    onFilterChange?.({ name, location, salary, companyField, workType, workArrangement: newWorkArrangement });
  }

  const handleReset = () => {
    setSalary("all");
    setWorkType("all");
    setCompanyField("all");
    setWorkArrangement("all");
    onFilterChange?.({ salary: "all", companyField: "all", workType: "all", workArrangement: "all" });
  };


  return (
    <aside className="w-full max-w-xs bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2"><Filter className="h-5 w-5"/>Bộ lọc</h2>
        <Button
          variant="ghost"
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-green-600 hover:underline"
        >
          Xóa lọc
        </Button>
      </div>

      <RadioFilterGroup
        title="Mức lương"
        name="salary"
        options={SALARY_OPTIONS}
        value={salary}
        onChange={handleSalaryChange}
      />

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Lĩnh vực công ty</h3>
        <div className="flex flex-col gap-2">
          <NativeSelect onChange={(e) => handleCompanyField(e.target.value)}>
            {COMPANY_FIELD.map((field) => (
              <NativeSelectOption key={field.label} value={field.label}>{field.label}</NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>

      <RadioFilterGroup
        title="Hình thức làm việc"
        name="workType"
        options={WORK_TYPE_OPTIONS}
        value={workType}
        onChange={handleWorkTypeChange}
      />

      <RadioFilterGroup 
        title="Loại hình làm việc"
        name='workArrangement'
        options={WORK_ARRANGEMENT}
        value={workArrangement}
        onChange={handleWorkArrangement}
      />
    </aside>
  );
}
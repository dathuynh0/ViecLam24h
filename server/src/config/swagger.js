import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ViecLam24h API Documentation",
      version: "1.0.0",
      description: "Tài liệu hướng dẫn sử dụng API cho hệ thống ViecLam24h. Swagger dùng để xem danh sách API, dữ liệu đầu vào, dữ liệu trả về và kiểm thử API trực tiếp trên trình duyệt."
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server"
      }
    ],
    tags: [
      {
        name: "Jobs",
        description: "API quản lý bài đăng tuyển dụng"
      },
      {
        name: "Applications",
        description: "API quản lý hồ sơ ứng tuyển"
      }
    ],
    components: {
      schemas: {
        JobInput: {
          type: "object",
          required: ["companyId", "categoryId", "title", "salaryMin", "salaryMax", "location"],
          properties: {
            companyId: { type: "string", example: "a1b2c3d4e5" },
            categoryId: { type: "string", example: "f6g7h8i9j0" },
            title: { type: "string", example: "Frontend Developer" },
            jobRequirement: {
              type: "array",
              items: { type: "string" },
              example: ["Có kinh nghiệm ReactJS", "Biết làm việc với REST API"]
            },
            description: {
              type: "array",
              items: { type: "string" },
              example: ["Xây dựng giao diện website", "Phối hợp với backend để tích hợp API"]
            },
            candidateRequirement: {
              type: "array",
              items: { type: "string" },
              example: ["Tốt nghiệp ngành CNTT", "Có tinh thần học hỏi"]
            },
            benefit: {
              type: "array",
              items: { type: "string" },
              example: ["Lương tháng 13", "Môi trường làm việc trẻ trung"]
            },
            salaryMin: { type: "integer", example: 8000000 },
            salaryMax: { type: "integer", example: 15000000 },
            location: { type: "string", example: "TP. Hồ Chí Minh" },
            workTime: {
              oneOf: [
                { type: "array", items: { type: "string" } },
                { type: "object" }
              ],
              example: ["Thứ 2 - Thứ 6", "08:00 - 17:00"]
            }
          }
        },
        ApplicationInput: {
          type: "object",
          required: ["candidateId", "jobId"],
          properties: {
            candidateId: { type: "string", example: "cand12345" },
            jobId: { type: "string", example: "job12345" },
            applyCVUrl: { type: "string", example: "https://example.com/cv/nguyenvana.pdf" }
          }
        },
        ApplicationStatusUpdate: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: ["pending", "reviewing", "interviewing", "accepted", "rejected"],
              example: "reviewing"
            }
          }
        },
        SuccessResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Thao tác thành công" },
            data: { type: "object" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Có lỗi xảy ra" },
            error: { type: "string", example: "Chi tiết lỗi" }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

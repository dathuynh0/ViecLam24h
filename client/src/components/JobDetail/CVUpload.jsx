import { useState } from 'react'
import { FileUp, FileText, X } from 'lucide-react'
import { Button } from '../ui/button'

const CvUpload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (selectedFile) => {
    if (!selectedFile) return
    setFile(selectedFile)
    onFileSelect?.(selectedFile)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const handleRemove = () => {
    setFile(null)
  }

  return (
    <div className="max-w-md">
      {!file ? (
        <label
          htmlFor="cv-input"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-2 rounded-lg border-[1.5px] border-dashed p-8 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'}`}
        >
          <FileUp className="h-7 w-7 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">
              Kéo thả CV vào đây hoặc <span className="text-primary">chọn file</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">PDF — tối đa 5MB</p>
          </div>
          <input
            id="cv-input"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/40 px-3 py-2.5">
          <FileText className="h-5 w-5 text-red-500 shrink-0" />
          <div className="flex-1 max-w-60">
            <p className="text-sm font-medium truncate pr-2">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button
            variant="ghost"
            type="button"
            aria-label="Xóa file"
            onClick={handleRemove}
            className="h-7 w-7 p-0 shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default CvUpload
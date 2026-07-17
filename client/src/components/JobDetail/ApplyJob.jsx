import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react'
import CvUpload from './CVUpload'
import { useApplicationStore } from '@/stores/useApplicationStore'
import { toast } from 'sonner' // hoặc thư viện toast bạn đang dùng

const ApplyJob = ({ openApplyDialog, setOpenApplyDialog, job }) => {
  const [file, setFile] = useState(null)
  const [introduction, setIntroduction] = useState('')
  const { applyJob, applicationLoading } = useApplicationStore()

  const handleApplyJob = async () => {
    if (!file) {
      toast.error('Vui lòng chọn CV trước khi ứng tuyển')
      return
    }
    if (!introduction.trim()) {
      toast.error('Vui lòng viết thư giới thiệu')
      return
    }

    const formatIntroduction = introduction
    .trim()
    .split(/\n+/)          // tách theo dòng trống hoặc xuống dòng
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

    await applyJob(job?.id, file, formatIntroduction);
    
    setOpenApplyDialog(false)
    setFile(null)
    setIntroduction('')
  }

  
  

  return (
    <Dialog open={openApplyDialog} onOpenChange={setOpenApplyDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-bold">Ứng tuyển</DialogTitle>
          <DialogDescription className="text-center">
            {job?.title}
          </DialogDescription>
        </DialogHeader>

        <CvUpload onFileSelect={setFile} />

        <div>
          <h2 className="text-base font-medium">Thư giới thiệu</h2>
          <p className="text-muted-foreground text-sm">
            Một thư giới thiệu ngắn gọn, chỉnh chu để gây ấn tượng cho nhà tuyển dụng
          </p>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            rows={4}
            className="border border-gray-300 rounded-lg p-4 w-full mt-2"
            placeholder="Giới thiệu bản thân (điểm mạnh, điểm yếu) và mong muốn, lý do tại sao bạn lại ứng tuyển công việc này"
          />
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            className="text-red-800 bg-red-100"
            onClick={() => setOpenApplyDialog(false)}
            disabled={applicationLoading}
          >
            Thoát
          </Button>
          <Button
            variant="ghost"
            className="text-green-800 bg-green-200"
            onClick={handleApplyJob}
            disabled={applicationLoading}
          >
            Ứng tuyển
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApplyJob
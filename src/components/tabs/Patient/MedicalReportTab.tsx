import React, { useEffect, useState } from 'react'
import { Download, Eye, FileText, Upload } from "lucide-react";
import api from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';


function MedicalReportTab() {

    const [uploading, setUploading] = React.useState(false);
    const [uploadMessage, setUploadMessage] = React.useState("");
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
 const { user } = useAuth();
    
      const [tests, setTests] = useState<Array<{   
      id: string;
      patient: string;
      testType: string;
      prescribedBy: string;
      date: string;
      amount: string;
      notes: string;
      amountStatus: string;
     }>>([]);

     const getPatientId = () => {
            if (user?.id) return user.id;
            try {
                const stored = localStorage.getItem('healthcare_user');
                if (stored) return JSON.parse(stored)?.id || '';
            } catch {
                return '';
            }
            return '';
        };

      const patientId = getPatientId();
      if(!patientId) {
        console.error("Patient ID not found");
        return;
      }

  useEffect(() => {
    if (!patientId) return; 

    api
      .get(`/tests/${patientId}`)
      .then((res) => {
        setTests(res.data);
      })
      .catch((err) => console.error("Error fetching tests:", err));
  }, [patientId]);


    // ✅ Handle button click → open file picker
    const handleReportUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        // check file type and size
        if (!["application/pdf", "image/png", "image/jpeg"].includes(file.type)) {
            setUploadMessage("❌ Only PDF, JPG, or PNG files are allowed.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setUploadMessage("❌ File size exceeds 10MB limit.");
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            setUploadMessage("");

            const response = await api.post("/api/reports/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                // onUploadProgress: (progressEvent) => {
                //   // const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                //   setUploadMessage(`Uploading... ${percent}%`);
                // },
            });

            setUploadMessage("✅ File uploaded successfully!");
            console.log("Upload response:", response.data);
        } catch (error) {
            console.error("Upload failed:", error);
            setUploadMessage("❌ Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    // const recentReports = [
    //     {
    //         id: '1',
    //         name: 'Blood Test Results',
    //         date: '2024-01-15',
    //         type: 'Lab Report',
    //         doctor: 'Dr. Sarah Johnson',
    //     },
    //     {
    //         id: '2',
    //         name: 'X-Ray Chest',
    //         date: '2024-01-10',
    //         type: 'Imaging',
    //         doctor: 'Dr. Michael Brown',
    //     },
    // ];

    return (
        <div className="space-y-6">
            {/* Upload */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center border-2 border-dashed border-gray-300">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-gray-500">Supported: PDF, JPG, PNG (Max 10MB)</p>

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {/* Upload Button */}
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
                    onClick={handleReportUpload}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Choose Files"}
                </button>

                {/* Status Message */}
                {uploadMessage && (
                    <p
                        className={`mt-3 text-sm ${uploadMessage.startsWith("✅")
                            ? "text-green-600"
                            : uploadMessage.startsWith("❌")
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                    >
                        {uploadMessage}
                    </p>
                )}

            </div>

            {/* Reports List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Reports</h3>
                <div className="space-y-4">
                    {
                    
                    Array.isArray(tests) && tests.length >  0 ?  (
                       tests.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                                <div>
                                    <p className="font-medium text-gray-900">{report.testType}</p>
                                    <p className="text-sm text-gray-500">{report.testType} • {report.date}</p>
                                    <p className="text-sm text-gray-500">Uploaded by {report.prescribedBy}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))
                    ):(
                        <p className="text-gray-600">No medical reports found.</p>
                    )
                    }

                    
                </div>
            </div>
        </div>
    )
}

export default MedicalReportTab

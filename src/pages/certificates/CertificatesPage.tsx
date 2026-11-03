import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Calendar,
  Download,
  Printer,
  ShieldCheck,
  GraduationCap,
  ExternalLink,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { Certificate } from '../../types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';

export const CertificatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { student } = useStudent();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certificates = student?.certificates || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
          <Award className="w-4 h-4 text-emerald-500" />
          <span>Accredited Credentials</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          My Certificates
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          View, print, and share your verifiable digital certificates of course completion.
        </p>
      </div>

      {/* List of Certificates */}
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <Badge variant="emerald">Verified</Badge>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-slate-400">
                    ID: {cert.certificateNumber}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 mt-1">
                    {cert.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Recipient: <strong className="text-slate-700 dark:text-slate-300">{cert.studentName}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Issued: {cert.issueDate}</span>
                <Button
                  size="sm"
                  onClick={() => setSelectedCert(cert)}
                  leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  View Credential
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Award className="w-8 h-8 text-indigo-600" />}
          title="No certificates earned yet"
          description="Complete 100% of the lessons in any enrolled course to automatically mint your verified certificate."
          actionLabel="Explore Courses"
          onAction={() => navigate('/explore')}
        />
      )}

      {/* Official Certificate Modal */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-mono text-slate-400">
                Credential: {selectedCert.certificateNumber}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print / Save as PDF
              </Button>
            </div>

            {/* Printable Certificate Template */}
            <div
              id="certificate-print-area"
              className="bg-white text-slate-900 border-8 border-double border-indigo-900 p-8 sm:p-12 rounded-2xl relative shadow-inner overflow-hidden select-none"
              style={{
                backgroundImage:
                  'radial-gradient(#e0e7ff 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            >
              {/* Watermark Emblem */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <GraduationCap className="w-96 h-96 text-indigo-900" />
              </div>

              {/* Certificate Inner Frame */}
              <div className="border border-indigo-800/40 p-6 sm:p-10 text-center space-y-6 relative z-10">
                {/* Header */}
                <div className="flex items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-900 text-white flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black tracking-wider uppercase text-indigo-900">
                    Learnify
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold uppercase tracking-[0.3em] text-slate-500">
                    Certificate of Completion
                  </h4>
                  <p className="text-xs text-slate-400">
                    This document proudly certifies that
                  </p>
                </div>

                {/* Recipient Name */}
                <div className="py-2 border-b-2 border-slate-300 max-w-md mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 tracking-tight">
                    {selectedCert.studentName}
                  </h2>
                </div>

                {/* Course Title & Statement */}
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  has successfully satisfied all rigorous curriculum modules, lesson requirements,
                  and interactive practical exercises for
                </p>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {selectedCert.courseTitle}
                </h3>

                {/* Signatures & Seal Row */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 mt-6 items-center text-xs">
                  <div className="text-left">
                    <span className="font-mono text-[10px] text-slate-400 block">Issue Date</span>
                    <span className="font-bold text-slate-800">{selectedCert.issueDate}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-amber-500 bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs shadow-sm">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">
                      Official Seal
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[10px] text-slate-400 block">
                      Credential ID
                    </span>
                    <span className="font-mono text-[11px] font-bold text-slate-800">
                      {selectedCert.certificateNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

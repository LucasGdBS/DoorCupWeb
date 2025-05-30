import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SunSnow } from "lucide-react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Modal({ open, onOpenChange }: ModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#091213] text-[#53d071]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2 items-center">
            Sua bebida está pronta!
            <span className="relative flex">

            <SunSnow className="absolute animate-ping" />
            <SunSnow className="text-sky-500"/>
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            A temperatura já está como vc gosta! Aproveite!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black cursor-pointer">
            Ok!
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

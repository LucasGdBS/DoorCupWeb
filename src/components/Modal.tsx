import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Modal({ open, onOpenChange }: ModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#091213] text-[#53d071]">
        <AlertDialogHeader>
          <AlertDialogTitle>Sua bebida está pronta!</AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            A temperatura já está como vc gosta! Aproveite!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black cursor-pointer">Ok!</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

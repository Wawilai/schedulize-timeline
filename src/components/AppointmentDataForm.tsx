import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Appointment } from '@/types/schedule';

const serviceFormSchema = z.object({
  customerName: z.string().min(2, 'กรุณากรอกชื่อลูกค้า'),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  service: z.string().min(2, 'กรุณาระบุบริการ'),
  serviceDetails: z.string().optional(),
  customerLevel: z.enum(['VIP', 'Platinum', 'Gold', 'Silver']).optional(),
  notes: z.string().optional(),
  price: z.string().optional(),
  duration: z.string().optional(),
});

type ServiceFormData = z.infer<typeof serviceFormSchema>;

interface AppointmentDataFormProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onSave: (appointmentId: number, data: ServiceFormData) => void;
}

const AppointmentDataForm: React.FC<AppointmentDataFormProps> = ({
  isOpen,
  onClose,
  appointment,
  onSave,
}) => {
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      customerName: appointment?.customerName || '',
      customerPhone: '',
      customerEmail: '',
      service: appointment?.service || '',
      serviceDetails: '',
      customerLevel: appointment?.customerLevel || undefined,
      notes: appointment?.notes || '',
      price: '',
      duration: '',
    },
  });

  React.useEffect(() => {
    if (appointment) {
      form.reset({
        customerName: appointment.customerName || '',
        customerPhone: '',
        customerEmail: '',
        service: appointment.service || '',
        serviceDetails: '',
        customerLevel: appointment.customerLevel || undefined,
        notes: appointment.notes || '',
        price: '',
        duration: '',
      });
    }
  }, [appointment, form]);

  const onSubmit = (data: ServiceFormData) => {
    if (appointment) {
      onSave(appointment.id, data);
      onClose();
    }
  };

  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            บันทึกข้อมูลการให้บริการ - {appointment.title}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อลูกค้า *</FormLabel>
                    <FormControl>
                      <Input placeholder="กรอกชื่อลูกค้า" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เบอร์โทรศัพท์</FormLabel>
                    <FormControl>
                      <Input placeholder="xxx-xxx-xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อีเมล</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="customer@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ระดับลูกค้า</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกระดับลูกค้า" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="VIP">VIP</SelectItem>
                        <SelectItem value="Platinum">Platinum</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>บริการ *</FormLabel>
                    <FormControl>
                      <Input placeholder="ระบุบริการที่ให้" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ราคา (บาท)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="serviceDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รายละเอียดบริการ</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับบริการ..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>หมายเหตุ</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="หมายเหตุเพิ่มเติม..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="min-w-[100px]"
              >
                ยกเลิก
              </Button>
              <Button 
                type="submit"
                className="min-w-[100px] bg-gradient-primary"
              >
                บันทึก
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDataForm;
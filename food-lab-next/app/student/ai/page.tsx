import { AiDiet } from '@/components/student/ai-diet'
import AiHeader from '@/components/student/ai-header'
import { StudentHeader } from '@/components/student/student-header'

export default function StudentAiPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <StudentHeader />

      <AiHeader />

      <p className="mb-4 text-muted-foreground">Инструмент на базе ИИ для распознавания еды, расчёта калорий и отслеживания питания.</p>

      <AiDiet />
    </main>
  )
}

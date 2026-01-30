import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, CreditCard, Banknote, Building2 } from "lucide-react"
import { formatNumber } from "@/lib/utils"

const transactions = [
  { id: 1, type: "income", description: "Pro Plan - Алия К.", amount: 20000, method: "Kaspi", date: "07.12.2025" },
  { id: 2, type: "income", description: "Basic Plan - Даурен М.", amount: 15000, method: "Card", date: "07.12.2025" },
  {
    id: 3,
    type: "payout",
    description: "Main Canteen 2 - Выплата",
    amount: -450000,
    method: "Bank",
    date: "06.12.2025",
  },
  {
    id: 4,
    type: "income",
    description: "Enterprise Plan - Компания X",
    amount: 25000,
    method: "Bank",
    date: "06.12.2025",
  },
  {
    id: 5,
    type: "payout",
    description: "Narxoz Canteen - Выплата",
    amount: -320000,
    method: "Bank",
    date: "05.12.2025",
  },
]

export default function AdminFinancePage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-background border-b border-border p-4">
          <h1 className="text-xl font-bold">Финансы</h1>
          <p className="text-sm text-muted-foreground">Доходы и выплаты</p>
        </header>

        <main className="p-6">
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <ArrowUpRight className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Доход за месяц</p>
                    <p className="text-2xl font-bold">4,250,000₸</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <ArrowDownRight className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Выплаты столовым</p>
                    <p className="text-2xl font-bold">3,180,000₸</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Banknote className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Комиссия FoodLab</p>
                    <p className="text-2xl font-bold">1,070,000₸</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Транзакции</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Описание</TableHead>
                    <TableHead>Метод</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">{tx.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          {tx.method === "Kaspi" && <CreditCard className="h-3 w-3" />}
                          {tx.method === "Card" && <CreditCard className="h-3 w-3" />}
                          {tx.method === "Bank" && <Building2 className="h-3 w-3" />}
                          {tx.method}
                        </Badge>
                      </TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell
                        className={`text-right font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {formatNumber(tx.amount)}₸
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

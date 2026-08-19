'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Award02Icon,
  BookOpen01Icon,
  BoxIcon,
  Building02Icon,
  Cancel01Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  Clock01Icon,
  CreditCardIcon,
  Delete02Icon,
  DropletsIcon,
  FavouriteIcon,
  File01Icon,
  FilterIcon,
  Edit02Icon,
  FlashIcon,
  FoldVerticalIcon,
  FootprintsIcon,
  HashIcon,
  Home01Icon,
  Image01Icon,
  InformationCircleIcon,
  Key01Icon,
  Layers01Icon,
  LayoutGridIcon,
  Loading02Icon,
  LockIcon,
  Mail01Icon,
  MapPinIcon,
  Menu01Icon,
  Message01Icon,
  MinusSignIcon,
  MoreHorizontalIcon,
  Cursor01Icon,
  Package01Icon,
  PaintBoardIcon,
  PlusSignIcon,
  PrinterIcon,
  Refresh01Icon,
  RestaurantIcon,
  RulerIcon,
  RupeeIcon,
  ScissorIcon,
  Search01Icon,
  Settings01Icon,
  Shield01Icon,
  Shield02Icon,
  Shirt01Icon,
  ShoppingBag01Icon,
  ShoppingCart01Icon,
  SlidersHorizontalIcon,
  SmartPhone01Icon,
  SparklesIcon,
  StarIcon,
  Tag01Icon,
  Tick01Icon,
  CheckmarkCircle01Icon,
  TruckIcon,
  User02Icon,
  UserGroupIcon,
  WeightScale01Icon,
  ZapIcon,
  ChartDecreaseIcon,
  ChartIncreaseIcon,
  Call02Icon,
  Leaf02Icon,
  InboxIcon,
  Logout01Icon,
} from '@hugeicons/core-free-icons';

/**
 * Central icon map: Lucide name → Hugeicons icon data.
 * Every component imports from here instead of lucide-react directly.
 */
const ICON_MAP = {
  AlertCircle: AlertCircleIcon,
  AlertTriangle: AlertCircleIcon,
  ArrowLeft: ArrowLeft01Icon,
  ArrowRight: ArrowRight01Icon,
  ArrowUpRight: ArrowUpRight01Icon,
  Award: Award02Icon,
  BadgeIndianRupee: RupeeIcon,
  BookOpen: BookOpen01Icon,
  Box: BoxIcon,
  Building2: Building02Icon,
  Check: Tick01Icon,
  CheckCircle: CheckmarkCircle01Icon,
  ChevronDown: ChevronDownIcon,
  ChevronRight: ChevronRightIcon,
  Clock: Clock01Icon,
  CreditCard: CreditCardIcon,
  Droplets: DropletsIcon,
  FileText: File01Icon,
  Filter: FilterIcon,
  FoldVertical: FoldVerticalIcon,
  Footprints: FootprintsIcon,
  Hash: HashIcon,
  Heart: FavouriteIcon,
  Home: Home01Icon,
  Image: Image01Icon,
  Info: InformationCircleIcon,
  Inbox: InboxIcon,
  Layers: Layers01Icon,
  LayoutDashboard: LayoutGridIcon,
  Loader2: Loading02Icon,
  Lock: LockIcon,
  Key: Key01Icon,
  LogOut: Logout01Icon,
  Mail: Mail01Icon,
  MapPin: MapPinIcon,
  LocateFixed: MapPinIcon,
  Menu: Menu01Icon,
  MessageSquare: Message01Icon,
  Minus: MinusSignIcon,
  MoreHorizontal: MoreHorizontalIcon,
  MousePointerClick: Cursor01Icon,
  Package: Package01Icon,
  PackageMinus: Package01Icon,
  PackageCheck: Shield02Icon,
  Palette: PaintBoardIcon,
  Phone: Call02Icon,
  Leaf: Leaf02Icon,
  Plus: PlusSignIcon,
  Printer: PrinterIcon,
  RefreshCw: Refresh01Icon,
  Ruler: RulerIcon,
  Scissors: ScissorIcon,
  Search: Search01Icon,
  Settings: Settings01Icon,
  Shield: Shield01Icon,
  ShieldCheck: Shield02Icon,
  Shirt: Shirt01Icon,
  ShoppingBag: ShoppingBag01Icon,
  ShoppingCart: ShoppingCart01Icon,
  SlidersHorizontal: SlidersHorizontalIcon,
  Smartphone: SmartPhone01Icon,
  Sparkles: SparklesIcon,
  Star: StarIcon,
  Tag: Tag01Icon,
  Trash2: Delete02Icon,
  Edit2: Edit02Icon,
  TrendingDown: ChartDecreaseIcon,
  TrendingUp: ChartIncreaseIcon,
  Truck: TruckIcon,
  User: User02Icon,
  Users: UserGroupIcon,
  UtensilsCrossed: RestaurantIcon,
  Weight: WeightScale01Icon,
  X: Cancel01Icon,
  Zap: ZapIcon,
};

/**
 * Unified icon component for the project.
 *
 * @param {object}  props
 * @param {string}  props.name      - Lucide-style icon name (e.g. "ArrowRight")
 * @param {number}  [props.size=20] - Icon size in pixels
 * @param {string}  [props.className] - Additional CSS classes
 */
export default function Icon({ name, size = 20, className = '', ...rest }) {
  const iconData = ICON_MAP[name];

  if (!iconData) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Icon] Unknown icon name: "${name}"`);
    }
    return null;
  }

  return (
    <HugeiconsIcon
      icon={iconData}
      size={size}
      className={className}
      {...rest}
    />
  );
}

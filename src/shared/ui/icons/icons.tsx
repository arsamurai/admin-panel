import ArrowDownIcon from "@assets/icons/icon-picker/arrow-down.svg"
import ArrowNextIcon from "@assets/icons/icon-picker/arrow-next.svg"
import ArrowTopIcon from "@assets/icons/icon-picker/arrow-top.svg"
import AwardIcon from "@assets/icons/icon-picker/award.svg"
import CalendarIcon from "@assets/icons/icon-picker/calendar.svg"
import CheckIcon from "@assets/icons/icon-picker/check.svg"
import DislikeIcon from "@assets/icons/icon-picker/dislike.svg"
import DndIcon from "@assets/icons/icon-picker/dnd.svg"
import DownloadFileIcon from "@assets/icons/icon-picker/download-file.svg"
import ExitIcon from "@assets/icons/icon-picker/exit.svg"
import EyeIcon from "@assets/icons/icon-picker/eye.svg"
import FileIcon from "@assets/icons/icon-picker/file.svg"
import FiltersIcon from "@assets/icons/icon-picker/filters.svg"
import HeartIcon from "@assets/icons/icon-picker/heart.svg"
import HomeIcon from "@assets/icons/icon-picker/home.svg"
import ImageIcon from "@assets/icons/icon-picker/image.svg"
import InternetIcon from "@assets/icons/icon-picker/internet.svg"
import KeyIcon from "@assets/icons/icon-picker/key.svg"
import LikeIcon from "@assets/icons/icon-picker/like.svg"
import LoadFileIcon from "@assets/icons/icon-picker/load-file.svg"
import MarkersIcon from "@assets/icons/icon-picker/markers.svg"
import MenuIcon from "@assets/icons/icon-picker/menu.svg"
import MessageIcon from "@assets/icons/icon-picker/message.svg"
import PencilIcon from "@assets/icons/icon-picker/pencil.svg"
import PersonIcon from "@assets/icons/icon-picker/person.svg"
import PhoneIcon from "@assets/icons/icon-picker/phone.svg"
import PhotoIcon from "@assets/icons/icon-picker/photo.svg"
import PlusIcon from "@assets/icons/icon-picker/plus.svg"
import QuestionIcon from "@assets/icons/icon-picker/question.svg"
import ShareIcon from "@assets/icons/icon-picker/share.svg"
import TrashIcon from "@assets/icons/icon-picker/trash.svg"
import TVIcon from "@assets/icons/icon-picker/tv.svg"
import YoutubeIcon from "@assets/icons/icon-picker/youtube.svg"
import ZoomIcon from "@assets/icons/icon-picker/zoom.svg"

export const icons = [
  { id: "arrow-down", svg: <ArrowDownIcon /> },
  { id: "arrow-next", svg: <ArrowNextIcon /> },
  { id: "arrow-top", svg: <ArrowTopIcon /> },
  { id: "award", svg: <AwardIcon /> },
  { id: "calendar", svg: <CalendarIcon /> },
  { id: "check", svg: <CheckIcon /> },
  { id: "dislike", svg: <DislikeIcon /> },
  { id: "dnd", svg: <DndIcon /> },
  { id: "download-file", svg: <DownloadFileIcon /> },
  { id: "exit", svg: <ExitIcon /> },
  { id: "eye", svg: <EyeIcon /> },
  { id: "file", svg: <FileIcon /> },
  { id: "filters", svg: <FiltersIcon /> },
  { id: "heart", svg: <HeartIcon /> },
  { id: "home", svg: <HomeIcon /> },
  { id: "image", svg: <ImageIcon /> },
  { id: "internet", svg: <InternetIcon /> },
  { id: "key", svg: <KeyIcon /> },
  { id: "like", svg: <LikeIcon /> },
  { id: "load-file", svg: <LoadFileIcon /> },
  { id: "markers", svg: <MarkersIcon /> },
  { id: "menu", svg: <MenuIcon /> },
  { id: "message", svg: <MessageIcon /> },
  { id: "pencil", svg: <PencilIcon /> },
  { id: "person", svg: <PersonIcon /> },
  { id: "phone", svg: <PhoneIcon /> },
  { id: "photo", svg: <PhotoIcon /> },
  { id: "plus", svg: <PlusIcon /> },
  { id: "question", svg: <QuestionIcon /> },
  { id: "share", svg: <ShareIcon /> },
  { id: "trash", svg: <TrashIcon /> },
  { id: "tv", svg: <TVIcon /> },
  { id: "youtube", svg: <YoutubeIcon /> },
  { id: "zoom", svg: <ZoomIcon /> },
]

export const getSvgById = (id: string) => {
  return icons.find(item => item.id === id)?.svg
}

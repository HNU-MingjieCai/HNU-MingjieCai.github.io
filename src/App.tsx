/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Github, ExternalLink, ChevronRight, FileArchive, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

// Mock data for the homepage
const PUBLICATIONS = [
  {
    authors: "Mingjie Cai, Chutian Zhou, Chaoqun Huang*, Jiaxin Zhan, Hamido Fujita",
    title: "Elastic Agents in Cooperative Feature Selection through Multi-Agent Reinforcement Learning",
    venue: "Knowledge-Based Systems",
    year: "2026",
    date:"2026-03-05",
    doi: "10.1016/j.knosys.2026.115717",
    opensource: true, // 设置为 true 显示图标
    bib:`@article{CAI2026115717,
        title = {Elastic Agents in Cooperative Feature Selection through Multi-Agent Reinforcement Learning},
        journal = {Knowledge-Based Systems},
        pages = {115717},
        year = {2026},
        issn = {0950-7051},
        doi = {https://doi.org/10.1016/j.knosys.2026.115717},
        url = {https://www.sciencedirect.com/science/article/pii/S0950705126004570},
        author = {Mingjie Cai and Chutian Zhou and Chaoqun Huang and Jiaxin Zhan and Hamido Fujita},
        }`,
    type: "Journal"
  },
  {
    authors: "Qiong Liu, Mingjie Cai*, Qingguo Li",
    title: "Low-dimensional representation-driven TSK fuzzy system for feature selection",
    venue: "IEEE Transactions on Fuzzy Systems",
    year: "2025",
    date:"2025-09-12",
    doi: "10.1109/TFUZZ.2025.3608935",
    opensource: false, 
    bib:`@article{liu2025low,
  title={Low-Dimensional Representation-Driven TSK Fuzzy System for Feature Selection},
  author={Liu, Qiong and Cai, Mingjie and Li, Qingguo},
  journal={IEEE Transactions on Fuzzy Systems},
  year={2025},
  publisher={IEEE}
}`,
    type: "Journal"
  },
  {
    authors: "Jiaxin Zhan, Mingjie Cai*, Qingguo Li",
    title: "Fuzzy clustering-based three-way asynchronous consensus for identifying manipulative and herd behaviors",
    venue: "IEEE Transactions on Fuzzy Systems",
    year: "2025",
    date:"2025-08-07",
    doi: "10.1109/TFUZZ.2025.3596689",
    bib:`@article{zhan2025fuzzy,
      title={Fuzzy clustering-based three-way asynchronous consensus for identifying manipulative and herd behaviors},
      author={Zhan, Jiaxin and Cai, Mingjie and Li, Qingguo},
      journal={IEEE Transactions on Fuzzy Systems},
      year={2025},
      publisher={IEEE}
    }`,
    type: "Journal"
  },
  {
    
    authors: "Xufei Guo, Qiong Liu*, Chaoqun Huang, Mingjie Cai*",
    title: "Density peaks clustering algorithm via fusing natural neighbor and fuzzy information",
    venue: "Neurocomputing",
    year: "2025",
    date:"2025-07-30",
    doi: "10.1016/j.neucom.2025.131152",
    bib:`@article{guo2025density,
  title={Density peaks clustering algorithm via fusing natural neighbor and fuzzy information},
  author={Guo, Xufei and Huang, Chaoqun and Cai, Mingjie and others},
  journal={Neurocomputing},
  pages={131152},
  year={2025},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Baochang Ren, Mingjie Cai*, Bin Yu*",
    title: "Multi-Dueling framework for multi-agent reinforcement learning",
    venue: "Applied Soft Computing",
    year: "2025",
    date:"2025-06-05",
    doi:"10.1016/j.asoc.2025.113464",
    bib:`@article{ren2025multi,
  title={Multi-Dueling framework for multi-agent reinforcement learning},
  author={Ren, Baochang and Cai, Mingjie and Yu, Bin},
  journal={Applied Soft Computing},
  volume={181},
  pages={113464},
  year={2025},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Mingjie Cai, Jiangyuan Wang, Feng Xu*, Qiong Liu, Hamido Fujita",
    title: "Anchor graph based connectivity peaks clustering",
    venue: "Knowledge-Based Systems",
    year: "2025",
    date:"2025-04-04",
    doi:"10.1016/j.knosys.2025.113498",
    bib:`@article{cai2025anchor,
  title={Anchor graph based connectivity peaks clustering},
  author={Cai, Mingjie and Wang, Jiangyuan and Xu, Feng and Liu, Qiong and Fujita, Hamido},
  journal={Knowledge-Based Systems},
  volume={319},
  pages={113498},
  year={2025},
  publisher={Elsevier}
    }`,
    type: "Journal"
  },
  {
    authors: "Mingjie Cai, Dongying Qi, Chaoqun Huang*, Jiaxin Zhan",
    title: "Prototype-based fuzzy rough sets for outlier detection",
    venue: "Fuzzy Sets and Systems",
    year: "2025",
    date:"2025-03-10",
    doi:"10.1016/j.fss.2025.109460",
    bib:`@article{cai2025prototype,
      title={Prototype-based fuzzy rough sets for outlier detection},
      author={Cai, Mingjie and Qi, Dongying and Huang, Chaoqun and Zhan, Jiaxin},
      journal={Fuzzy Sets and Systems},
      volume={517},
      pages={109460},
      year={2025},
      publisher={Elsevier}
    }`,
    type: "Journal"
  },
  {
    authors: "Liangzhou Chen, Mingjie Cai*, Qingguo Li",
    title: "Multi-label feature selection with high-level semantic label relationships based on fuzzy rough sets",
    venue: "Fuzzy Sets and Systems",
    year: "2025",
    date:"2025-03-6",
    doi:"10.1016/j.fss.2025.109368",
    bib:`@article{chen2025multi,
      title={Multi-label feature selection with high-level semantic label relationships based on fuzzy rough sets},
      author={Chen, Liangzhou and Cai, Mingjie and Li, Qingguo},
      journal={Fuzzy Sets and Systems},
      volume={510},
      pages={109368},
      year={2025},
      publisher={Elsevier}
    }`,
    type: "Journal"
  },
  {
    authors: "Bin Yu, Hengjie Xie, Jingxuan Chen, Mingjie Cai*, Hamido Fujita, Weiping Ding*",
    title: "SDHGCN: A heterogeneous graph convolutional neural network combined with shadowed set",
    venue: "IEEE Transactions on Fuzzy Systems",
    year: "2024",
    date:"2024-11-08",
    doi:"10.1109/TFUZZ.2024.3494864",
    bib:`@article{yu2024sdhgcn,
  title={SDHGCN: A heterogeneous graph convolutional neural network combined with shadowed set},
  author={Yu, Bin and Xie, Hengjie and Chen, Jingxuan and Cai, Mingjie and Fujita, Hamido and Ding, Weiping},
  journal={IEEE Transactions on Fuzzy Systems},
  volume={33},
  number={3},
  pages={881--893},
  year={2024},
  publisher={IEEE}
}`,
    type: "Journal"
  },
  {
    authors: "Jiaxin Zhan, Mingjie Cai*",
    title: "A cost-minimized two-stage three-way dynamic consensus mechanism for social network-large scale group decision-making: utilizing k-nearest neighbors for incomplete fuzzy preference relations",
    venue: "Expert Systems with Applications",
    year: "2024",
    date:"2024-11-03",
    doi:"10.1016/j.eswa.2024.125705",
    bib:`@article{zhan2025cost,
      title={A cost-minimized two-stage three-way dynamic consensus mechanism for social network-large scale group decision-making: Utilizing K-nearest neighbors for incomplete fuzzy preference relations},
      author={Zhan, Jiaxin and Cai, Mingjie},
      journal={Expert Systems with Applications},
      volume={263},
      pages={125705},
      year={2025},
      publisher={Elsevier}
    }`,
    type: "Journal"
  },
  {
    authors: "Qiong Liu, Mingjie Cai*, Qingguo Li, Chaoqun Huang",
    title: "Multi-label feature selection based on adaptive label enhancement and class-imbalance-aware fuzzy information entropy",
    venue: "International Journal of Approximate Reasoning",
    year: "2025",
    date:"2024-11-01",
    doi:"10.1016/j.ijar.2024.109320",
    bib:`@article{liu2025multi,
      title={Multi-label feature selection based on adaptive label enhancement and class-imbalance-aware fuzzy information entropy},
      author={Liu, Qiong and Cai, Mingjie and Li, Qingguo and Huang, Chaoqun},
      journal={International Journal of Approximate Reasoning},
      volume={176},
      pages={109320},
      year={2025},
      publisher={Elsevier}
    }`,
    type: "Journal"
  },
  {
    authors: "Mingjie Cai, Haichao Wang, Feng Xu*, Qingguo Li",
    title: "Neighborhood margin rough set: self-tuning neighborhood threshold",
    venue: "International Journal of Approximate Reasoning",
    year: "2024",
    date:"2024-08-15",
    doi: "10.1016/j.ijar.2024.109271",
    bib:`@article{cai2024neighborhood,
      title={Neighborhood margin rough set: self-tuning neighborhood threshold},
      author={Cai, Mingjie and Wang, Haichao and Xu, Feng and Li, Qingguo},
      journal={International Journal of Approximate Reasoning},
      volume={174},
      pages={109271},
      year={2024},
      publisher={Elsevier}
    }`,
    type: "Journal"
  },
  {
    authors: "Qiong Liu, Mingjie Cai*, Qingguo Li",
    title: "Supervised spectral feature selection with neighborhood rough set",
    venue: "Applied Soft Computing",
    year: "2024",
    date:"2024-08-06",
    doi: "10.1016/j.asoc.2024.112111",
    bib:`@article{liu2024supervised,
  title={Supervised spectral feature selection with neighborhood rough set},
  author={Liu, Qiong and Cai, Mingjie and Li, Qingguo},
  journal={Applied Soft Computing},
  volume={165},
  pages={112111},
  year={2024},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Mingjie Cai, Mingzhe Yan, Zhenhua Jia*",
    title: "Fuzzy three-way rule learning and its classification methods",
    venue: "Fuzzy Sets and Systems",
    year: "2024",
    date:"2024-04-24",
    doi: "10.1016/j.fss.2024.108993",
    bib:`@article{cai2024fuzzy,
      title={Fuzzy three-way rule learning and its classification methods},
      author={Cai, Mingjie and Yan, Mingzhe and Jia, Zhenhua},
      journal={Fuzzy Sets and Systems},
      volume={487},
      pages={108993},
      year={2024},
      publisher={Elsevier}
    }`,
    type: "Journal"
  },
  {
    authors: "Zhishan Wu, Mingjie Cai*, Feng Xu*, Qingguo Li",
    title: "PCS-granularity weighted ensemble clustering via co-association matrix",
    venue: "Applied Intelligence",
    year: "2024",
    date:"2024-03-13",
    doi: "10.1007/s10489-024-05368-3",
    bib:`@article{wu2024pcs,
  title={PCS-granularity weighted ensemble clustering via Co-association matrix: Z. Wu et al.},
  author={Wu, Zhishan and Cai, Mingjie and Xu, Feng and Li, Qingguo},
  journal={Applied Intelligence},
  volume={54},
  number={5},
  pages={3884--3901},
  year={2024},
  publisher={Springer}
}`,
    type: "Journal"
  },
  {
    authors: "Feng Xu, Mingjie Cai*, Qingguo Li, Jie Zhou, Hamido Fujita",
    title: "Connection density based clustering: A graph-based density clustering method",
    venue: "Applied Soft Computing",
    year: "2024",
    date:"2024-03-14",
    doi: "10.1016/j.asoc.2024.111779",
    bib:`@article{xu2024connection,
  title={Connection density based clustering: A graph-based density clustering method},
  author={Xu, Feng and Cai, Mingjie and Li, Qingguo and Zhou, Jie and Fujita, Hamido},
  journal={Applied Soft Computing},
  volume={161},
  pages={111779},
  year={2024},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Bin Yu, Zheng Zijian, Mingjie Cai*, Witold Pedrycz, Zeshui Xu",
    title: "CBCG: A clustering algorithm based on bidirectional conical information granularity",
    venue: "IEEE Transactions on Fuzzy Systems",
    date:"2024-03-07",
    doi: "10.1109/TFUZZ.2024.3397808",
    bib:`@article{yu2024cbcg,
  title={CBCG: A clustering algorithm based on bidirectional conical information granularity},
  author={Yu, Bin and Zheng, Zijian and Cai, Mingjie and Pedrycz, Witold and Xu, Zeshui},
  journal={IEEE Transactions on Fuzzy Systems},
  volume={32},
  number={8},
  pages={4388--4400},
  year={2024},
  publisher={IEEE}
}`,
    year: "2024",
    type: "Journal"
  },
  {
    authors: "Mingjie Cai, Mei Yan, Pei Wang*, Feng Xu",
    title: "Multi-label feature selection based on fuzzy rough sets with metric learning and label enhancement",
    venue: "International Journal of Approximate Reasoning",
    year: "2024",
    date:"2024-02-15",
    doi: "10.1016/j.ijar.2024.109149",
    bib:`@article{cai2024multi,
  title={Multi-label feature selection based on fuzzy rough sets with metric learning and label enhancement},
  author={Cai, Mingjie and Yan, Mei and Wang, Pei and Xu, Feng},
  journal={International Journal of Approximate Reasoning},
  volume={168},
  pages={109149},
  year={2024},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Zhenhua Jia, Mingjie Cai*, Qingguo Li",
    title: "DS-partial metric spaces and domain theory",
    venue: "Topology and its Applications",
    year: "2024",
    date:"2024-01-11",
    doi: "10.1016/j.topol.2024.108829",
    bib:`@article{jia2024ds,
  title={DS-partial metric spaces and domain theory},
  author={Jia, Zhenhua and Cai, Mingjie and Li, Qingguo},
  journal={Topology and its Applications},
  volume={344},
  pages={108829},
  year={2024},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Bin Yu, Zijian Zheng, Mingjie Cai*, Witold Pedrycz, Weiping Ding",
    title: "FRCM: A fuzzy rough c-means clustering method",
    venue: "Fuzzy Sets and Systems",
    year: "2024",
    date:"2024-01-06",
    doi: "10.1016/j.fss.2024.108860",
    bib:`@article{yu2024frcm,
  title={FRCM: A fuzzy rough c-means clustering method},
  author={Yu, Bin and Zheng, Zijian and Cai, Mingjie and Pedrycz, Witold and Ding, Weiping},
  journal={Fuzzy Sets and Systems},
  volume={480},
  pages={108860},
  year={2024},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Feng Xu, Mingjie Cai*, Qingguo Li, Haichao Wang, Hamido Fujita",
    title: "Shared neighbors rough set model and neighborhood classifiers",
    venue: "Expert Systems with Applications",
    year: "2024",
    date:"2024-03-07",
    doi: "10.1109/TFUZZ.2024.3397808",
    bib:`@article{xu2024shared,
  title={Shared neighbors rough set model and neighborhood classifiers},
  author={Xu, Feng and Cai, Mingjie and Li, Qingguo and Wang, Haichao and Fujita, Hamido},
  journal={Expert Systems with Applications},
  volume={244},
  pages={122965},
  year={2024},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Bin Yu, Ruihui Xu, Mingjie Cai*, Weiping Ding",
    title: "A clustering method based on multi-positive-negative granularity and attenuation-diffusion pattern",
    venue: "Information Fusion",
    year: "2023",
    date:"2023-11-13",
    doi: "10.1016/j.eswa.2023.122965",
    bib:`@article{yu2024clustering,
  title={A clustering method based on multi-positive--negative granularity and attenuation-diffusion pattern},
  author={Yu, Bin and Xu, Ruihui and Cai, Mingjie and Ding, Weiping},
  journal={Information Fusion},
  volume={103},
  pages={102137},
  year={2024},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Wanting Cai, Mingjie Cai*, Qingguo Li, Qiong Liu",
    title: "Three-way imbalanced learning based on fuzzy twin SVM",
    venue: "Applied Soft Computing",
    year: "2023",
    date:"2023-10-16",
    doi: "10.1016/j.asoc.2023.111066",
    bib:`@article{cai2024three,
  title={Three-way imbalanced learning based on fuzzy twin SVM},
  author={Cai, Wanting and Cai, Mingjie and Li, Qingguo and Liu, Qiong},
  journal={Applied Soft Computing},
  volume={150},
  pages={111066},
  year={2024},
  publisher={Elsevier}
}`,
    type: "Journal"
  },
  {
    authors: "Mingjie Cai, Zhishan Wu, Qingguo Li, Feng Xu*, Jie Zhou",
    title: "GFDC: A granule fusion density-based clustering with evidential reasoning",
    venue: "International Journal of Approximate Reasoning",
    year: "2023",
    date:"2023-10-26",
    doi: "10.1016/j.ijar.2023.109075",
    bib:`@article{cai2024gfdc,
  title={GFDC: A granule fusion density-based clustering with evidential reasoning},
  author={Cai, Mingjie and Wu, Zhishan and Li, Qingguo and Xu, Feng and Zhou, Jie},
  journal={International Journal of Approximate Reasoning},
  volume={164},
  pages={109075},
  year={2024},
  publisher={Elsevier}
}`,
    type: "Journal",
  },
  {
    authors: "Bin Yu, Hengjie Xie, Mingjie Cai*, Weiping Ding*",
    title: "MG-GCN: Multi-granularity graph convolutional neural network for multi-label classification in multi-label information system",
    venue: "IEEE Transactions on Emerging Topics in Computational Intelligence",
    year: "2023",
    date:"2023-08-11",
    doi: "10.1109/TETCI.2023.3300303",
    bib:`@article{yu2023mg,
  title={MG-GCN: Multi-granularity graph convolutional neural network for multi-label classification in multi-label information system},
  author={Yu, Bin and Xie, Hengjie and Cai, Mingjie and Ding, Weiping},
  journal={IEEE Transactions on Emerging Topics in Computational Intelligence},
  volume={8},
  number={1},
  pages={288--299},
  year={2023},
  publisher={IEEE}
}`,
    type: "Journal",
  }
];

const UNDER_REVIEW = [

];

const OPEN_SOURCE = [
  { name: "LHCMC", description: "Local-Hyperplane-Constrained-Self-Representation-for-Manifold-Clustering.", link: "https://github.com/HNU-MingjieCai/LHCMC" },
];

const GROUP_MEMBERS = [
  { name: "Mingjie Cai", role: "Professor", title: "Doctoral Tutor", image: "/images/caimingjie.jpg" },
  { name: "Chaoqun Huang", role: "Assistant Professor", image: "/images/huangchaoqun.jpg" },
  { name: "Feng Xu", role: "Assistant Professor", title: "", image: "/images/xufeng.jpg" },
  { name: "Zhenhua Jia", role: "Assistant Professor", title: "", image: "/images/jiazhenhua.jpg" },
  { name: "Qiong Liu", role: "PhD student", title: "", image: "/images/liuqiong.jpg" },
  { name: "Jiaxin Zhan", role: "PhD student", title: "", image: "/images/zhanjiaxin.jpg" },
  { name: "Ruihui Xu", role: "PhD student", title: "", image: "/images/xuruihui.jpg" },
  { name: "Liangzhou Chen", role: "PhD student", title: "", image: "/images/chenliangzhou.jpg" },
  { name: "Chenxing Jia", role: "PhD student", title: "", image: "/images/jiachenxing.jpg" },
  { name: "Chutian Zhou", role: "PhD student", title: "", image: "/images/zhouchutian.jpg" },
  { name: "Jiamei Wang", role: "Master student", title: "", image: "/images/wangjiamei.jpg" },
  { name: "Heng Lv", role: "Master student", title: "", image: "/images/lvheng.jpg" },
  { name: "Dongying Qi", role: "Master student", title: "", image: "/images/qidongying.jpg" },
  { name: "Manyu Wang", role: "Master student", title: "", image: "/images/wangmanyu.jpg" },
  { name: "Haoran Bian", role: "Master student", title: "", image: "/images/bianhaoran.jpg" },
  { name: "Ziran Wang", role: "Master student", title: "", image: "/images/wangziran.jpg" },
  { name: "Wuchong Zhang", role: "Master student", title: "", image: "/images/zhangwuchong.jpg" },
  { name: "Shungang Jiang", role: "Master student", title: "", image: "/images/jiangshungang.jpg" },
  { name: "Xiaofei Liu", role: "Master student", title: "", image: "/images/liuxiaofei.jpg" },
];

const NAV_ITEMS = [
  'News',
  'Publications',
  'Under Review',
  'Open Source',
  'Group Members',
];

export default function App() {
  const [activeTab, setActiveTab] = useState('News');
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pubItemsPerPage = 8;
  const osItemsPerPage = 6;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  const generateBib = (pub: any) => {
    if (pub.bib) return pub.bib;
    const firstAuthor = pub.authors.split(',')[0].split(' ').pop();
    const year = pub.year;
    const key = `${firstAuthor}${year}${pub.title.split(' ')[0].toLowerCase()}`;
    return `@article{${key},
  author = {${pub.authors}},
  title = {${pub.title}},
  journal = {${pub.venue}},
  year = {${pub.year}}
}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'News':
        return (
          <ul className="space-y-6">
            {PUBLICATIONS.slice(0, 5).map((pub, index) => (
              <li key={index} className="flex gap-4 items-start group">
                <div className="mt-1.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
                </div>
                <div>
                  <span className="text-red-600 font-semibold text-sm mr-2">
                    [{pub.date || pub.year}]
                  </span>
                  <span className="text-slate-800 font-medium leading-relaxed">
                    "{pub.title}"
                  </span>
                  <span className="text-slate-500 mx-2">has been accepted by</span>
                  <span className="text-emerald-600 font-semibold hover:underline cursor-pointer">
                    {pub.venue}.
                  </span>
                </div>
              </li>
            ))}
          </ul>
        );
      case 'Publications':
        const sortedPubs = [...PUBLICATIONS].sort((a, b) => parseInt(b.year) - parseInt(a.year));
        const years = [...new Set(sortedPubs.map(p => p.year))].sort((a, b) => parseInt(b) - parseInt(a));

        return (
          <div className="space-y-8">
            {/* Year Navigation */}
            <div className="flex flex-wrap gap-2 sticky top-[65px] bg-white/95 backdrop-blur-md py-4 z-10 border-b border-slate-100 -mx-4 px-4 sm:-mx-8 sm:px-8 shadow-sm sm:shadow-none">
              <span className="text-sm font-bold text-slate-400 mr-2 self-center">Jump to:</span>
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => {
                    const el = document.getElementById(`year-${year}`);
                    if (el) {
                      const offset = 100; // Adjust based on sticky header height
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = el.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-all"
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="space-y-10">
              {years.map(year => (
                <div key={year} id={`year-${year}`} className="scroll-mt-32">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                    {year}
                  </h3>
                  <div className="space-y-3">
                    {sortedPubs.filter(p => p.year === year).map((pub, i) => (
                      <div key={i} className="flex gap-3 group">
                        <span className="text-slate-400 font-mono text-xs w-5 flex-shrink-0 pt-1">{i + 1}.</span>
                        <div className="flex-1 text-[14px] leading-relaxed text-slate-800">
                          <span className="font-bold">{pub.authors}: </span>
                          <span className="italic">{pub.title}, </span>
                          <span className="text-emerald-700 font-semibold">{pub.venue}</span>
                          <span>, {pub.date || pub.year}. </span>
                          <a href={pub.doi ? `https://doi.org/${pub.doi}` : (pub.pdfLink || "#")} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium ml-1">[PDF]</a>
                          <button 
                            onClick={() => copyToClipboard(generateBib(pub))}
                            className="text-blue-600 hover:underline font-medium ml-2 align-baseline"
                            title="Copy BibTeX"
                          >
                            [Cite]
                          </button>
                          {pub.opensource && (
                            <a 
                              href={pub.codeLink || "#"} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center ml-2 text-slate-500 hover:text-blue-600 transition-colors align-middle"
                              title="GitHub"
                            >
                              <FileArchive size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Under Review':
        const sortedReview = [...UNDER_REVIEW].sort((a, b) => parseInt(b.year) - parseInt(a.year));
        return (
          <div className="space-y-2">
            {sortedReview.map((item, i) => (
              <div key={i} className="flex gap-4 items-start py-3 px-2 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                <div className="flex-shrink-0 w-12 text-center pt-1">
                  <span className="text-sm font-bold text-slate-400 font-mono">{item.year}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500">
                    Submitted to: <span className="text-emerald-600 italic font-medium">{item.venue}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'Open Source':
        const totalOSPages = Math.ceil(OPEN_SOURCE.length / osItemsPerPage);
        const osStartIndex = (currentPage - 1) * osItemsPerPage;
        const paginatedOS = OPEN_SOURCE.slice(osStartIndex, osStartIndex + osItemsPerPage);

        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedOS.map((repo, i) => (
                <a 
                  key={i} 
                  href={repo.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-blue-100 transition-colors">
                      <Github className="text-slate-400 group-hover:text-blue-600 transition-colors" size={20} />
                    </div>
                    <ExternalLink className="text-slate-300 group-hover:text-blue-400 transition-colors" size={16} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    {repo.name}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                    {repo.description}
                  </p>
                  <div className="mt-4 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    View Project <ChevronRight size={12} />
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalOSPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} className="rotate-180" />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalOSPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${currentPage === page ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-600'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalOSPages, prev + 1))}
                  disabled={currentPage === totalOSPages}
                  className="p-2 rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        );
      case 'Group Members':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10">
            {GROUP_MEMBERS.map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded-sm shadow-sm border border-slate-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-blue-600 font-bold text-sm mb-1 hover:underline cursor-pointer transition-colors">
                  {member.name}
                </h4>
                <p className="text-slate-600 text-[11px] leading-tight">{member.role}</p>
                {member.title && <p className="text-slate-600 text-[11px] leading-tight">{member.title}</p>}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-80 bg-slate-900 text-white overflow-hidden z-40 transition-transform duration-300 transform lg:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:flex flex-col`}>
        {/* Sidebar Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/university/800/1200?blur=5" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-slate-900/90" />
        </div>

        {/* Profile Section */}
        <div className="relative z-10 pt-12 pb-8 px-6 flex flex-col items-center text-center">
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="w-40 h-40 rounded-full border-4 border-white/20 overflow-hidden mb-6 shadow-2xl">
            <img 
              src="https://imggrzy.hnu.edu.cn/image/f94698cd-9ad3-a644-a2b9-b82b5158c594.jpg" 
              alt="Mingjie Cai" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/profile/400/400";
              }}
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-wider uppercase mb-1">Mingjie Cai</h1>
          <p className="text-sm font-medium text-white/70 uppercase tracking-widest">Professor</p>
          <p className="text-xs font-medium text-white/50 uppercase tracking-widest">Doctoral Supervisor</p>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex-1 mt-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveTab(item);
                setCurrentPage(1);
                setIsMenuOpen(false);
              }}
              className={`nav-link w-full text-left flex items-center justify-between ${activeTab === item ? 'active' : ''}`}
            >
              <span>{item}</span>
              {activeTab === item && <ChevronRight size={16} className="text-white/50" />}
            </button>
          ))}
        </nav>

        {/* Footer Contact */}
        <div className="relative z-10 p-6 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Get in Touch</p>
          <div className="flex gap-4">
            <a href="mailto:mingjiecai@hnu.edu.cn" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white">
              <Mail size={18} />
            </a>
            <a href="https://github.com/HNU-MingjieCai" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white">
              <Github size={18} />
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-slate-900 tracking-tight">Mingjie Cai</span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
            <img 
              src="https://imggrzy.hnu.edu.cn/image/f94698cd-9ad3-a644-a2b9-b82b5158c594.jpg" 
              alt="Mingjie Cai" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/profile/100/100";
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        {/* Desktop Header (top right) */}
        <header className="hidden lg:flex sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 justify-end items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700">Mingjie Cai</p>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
            <img 
              src="https://imggrzy.hnu.edu.cn/image/f94698cd-9ad3-a644-a2b9-b82b5158c594.jpg" 
              alt="Mingjie Cai" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/profile/100/100";
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        {/* Content Area */}
        <div className={`max-w-5xl mx-auto ${activeTab === 'Publications' ? 'px-4 py-6' : 'px-8 py-12'}`}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b-2 border-slate-100">
              {activeTab}
            </h2>

            {renderContent()}
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto px-8 py-12 mt-12 border-t border-slate-100 flex justify-center items-center text-xs text-slate-400">
          <p>© 2026 IS. All rights reserved.</p>
        </footer>
      </main>

      {/* Mobile Menu Button (Removed in favor of top header) */}
      {/* Toast Notification */}
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">BibTeX copied to clipboard!</span>
        </motion.div>
      )}
    </div>
  );
}

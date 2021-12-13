/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD.
If you want to view the source, visit the plugins’ github repository.
*/

var E=Object.create;var k=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty;var P=l=>k(l,"__esModule",{value:!0});var J=(l,i)=>{P(l);for(var e in i)k(l,e,{get:i[e],enumerable:!0})},q=(l,i,e)=>{if(i&&typeof i=="object"||typeof i=="function")for(let t of I(i))!A.call(l,t)&&t!=="default"&&k(l,t,{get:()=>i[t],enumerable:!(e=L(i,t))||e.enumerable});return l},b=l=>q(P(k(l!=null?E(j(l)):{},"default",l&&l.__esModule&&"default"in l?{get:()=>l.default,enumerable:!0}:{value:l,enumerable:!0})),l);var m=(l,i,e)=>new Promise((t,c)=>{var d=p=>{try{r(e.next(p))}catch(o){c(o)}},u=p=>{try{r(e.throw(p))}catch(o){c(o)}},r=p=>p.done?t(p.value):Promise.resolve(p.value).then(d,u);r((e=e.apply(l,i)).next())});J(exports,{default:()=>C});var N=b(require("obsidian"));var f=b(require("obsidian")),y=b(require("fs"));function F(l){let i=new Blob([l],{type:"text/javascript"}),e=URL.createObjectURL(i),t=new Worker(e);return URL.revokeObjectURL(e),t}function S(){return F(`self.onmessage=function(n){let c=n.data[0],i=n.data[1],f=c;c.forEach(l=>{let s=l.fileName,k=l.relativePath;f.forEach(t=>{s!==t.fileName&&t.links&&t.links.forEach(a=>{let e={};a.relativePath===k&&(e.fileName=t.fileName,e.link=a.link,e.relativePath=t.relativePath,a.cleanLink&&(e.cleanLink=a.cleanLink),a.displayText&&(e.displayText=a.displayText),i.push(e))})}),i.length>0&&(l.backlinks=i),i=[]}),self.postMessage(c)};
`)}var x=class{constructor(i,e){this.plugin=i,this.app=e}getAbsolutePath(i){let e,t;if(this.app.vault.adapter instanceof f.FileSystemAdapter)e=this.app.vault.adapter.getBasePath();else throw new Error("Cannot determine base path.");return t=`${this.app.vault.configDir}/plugins/metadata-extractor/${i}`,`${e}/${t}`}getUniqueTags(i){let e=[];return(0,f.getAllTags)(i)&&(e=(0,f.getAllTags)(i)),e=e.map(t=>t.slice(1).toLowerCase()),e=Array.from(new Set(e)),e}writeAllExceptMd(i){let e=this.plugin.settings.allExceptMdPath;this.plugin.settings.allExceptMdPath||(e=this.getAbsolutePath(i));let t=[],c=this.app.vault.getAllLoadedFiles();for(let r of c)r instanceof f.TFolder&&t.push({name:r.name,relativePath:r.path});let d=[];for(let r of c)r instanceof f.TFile&&r.path.slice(-3)!==".md"&&d.push({name:r.name,basename:r.basename,relativePath:r.path});let u={};t.length>0&&d.length>0?Object.assign(u,{folders:t,nonMdFiles:d}):Object.assign(u,{folders:t}),(0,y.writeFileSync)(e,JSON.stringify(u,null,2)),this.plugin.settings.consoleLog&&console.log("Metadata Extractor plugin: wrote the allExceptMd JSON file")}writeTagsToJSON(i){let e=this.app.metadataCache.getTags();if(Object.keys(e).length===0){let n="There are no tags in your vault.";if(this.plugin.settings.consoleLog){console.log(n);return}else return}let t=this.plugin.settings.tagPath;this.plugin.settings.tagPath||(t=this.getAbsolutePath(i));let c=[];for(let n of this.app.vault.getMarkdownFiles()){let a;this.app.metadataCache.getFileCache(n)!==null&&(a=this.app.metadataCache.getFileCache(n));let g=n.path,h=this.getUniqueTags(a);h.length!==0&&c.push({name:g,tags:h})}let u=c.map(n=>n.tags).reduce((n,a)=>n.concat(a.map(g=>g.toLowerCase()))),r=Array.from(new Set(u)),p=this.app.metadataCache.getTags(),o={};for(let[n,a]of Object.entries(p)){let g=n.slice(1).toLowerCase(),h=a;o[g]=h}let s=[];for(let n of r){let a=[];for(let h of c)h.tags.contains(n)&&a.push(h.name);let g=o[n];s.push({tag:n,tagCount:g,relativePaths:a})}(0,y.writeFileSync)(t,JSON.stringify(s,null,2)),this.plugin.settings.consoleLog&&console.log("Metadata Extractor plugin: wrote the tagToFile JSON file")}writeCacheToJSON(i){let e=this.plugin.settings.metadataPath;this.plugin.settings.metadataPath||(e=this.getAbsolutePath(i));let t=[],c={};for(let[r,p]of Object.entries(this.app.vault.fileMap)){let o=r,s="";if(o.slice(-3)===".md"){if(o.includes("/")){let n=o.split("/").last();typeof n=="string"&&(s=n)}s=s.slice(0,-3).toLowerCase(),c[s]=o}}for(let r of this.app.vault.getMarkdownFiles()){let p=r.basename,o=r.path,s;if(typeof this.app.metadataCache.getFileCache(r)!="undefined")s=this.app.metadataCache.getFileCache(r);else{new f.Notice("Something with accessing the cache went wrong!");return}let n,a,g=[],h={};h.fileName=p,h.relativePath=o,n=this.getUniqueTags(s),n!==null&&n.length>0&&(h.tags=n),s.frontmatter&&(a=(0,f.parseFrontMatterAliases)(s.frontmatter),a!==null&&a.length>0&&(h.aliases=a)),s.headings&&(s.headings.forEach(M=>{g.push({heading:M.heading,level:M.level})}),h.headings=g);let v=D(s,h,c,o,p);Object.assign(h,v),Object.keys(h).length>0&&t.push(h)}let d=[],u=S();u.postMessage([t,d]),u.onerror=r=>{new f.Notice("Something went wrong with the backlinks calculation.")},u.onmessage=r=>{t=r.data,(0,y.writeFileSync)(e,JSON.stringify(t,null,2)),this.plugin.settings.consoleLog&&console.log("Metadata Extractor plugin: wrote the metadata JSON file"),u.terminate()}}setWritingSchedule(i,e,t){if(this.plugin.settings.writingFrequency!=="0"){let d=parseInt(this.plugin.settings.writingFrequency)*6e4;window.clearInterval(this.plugin.intervalId1),this.plugin.intervalId1=void 0,this.plugin.intervalId1=window.setInterval(()=>this.writeTagsToJSON(i),d),this.plugin.registerInterval(this.plugin.intervalId1),window.clearInterval(this.plugin.intervalId2),this.plugin.intervalId2=void 0,this.plugin.intervalId2=window.setInterval(()=>this.writeCacheToJSON(e),d),this.plugin.registerInterval(this.plugin.intervalId2),window.clearInterval(this.plugin.intervalId3),this.plugin.intervalId3=void 0,this.plugin.intervalId3=window.setInterval(()=>this.writeAllExceptMd(t),d),this.plugin.registerInterval(this.plugin.intervalId3)}else this.plugin.settings.writingFrequency==="0"&&(window.clearInterval(this.plugin.intervalId1),window.clearInterval(this.plugin.intervalId2),window.clearInterval(this.plugin.intervalId3))}};function D(l,i,e,t,c){let d=[],u=[];r();function r(){let o=[],s=[];l.links&&(o=l.links),l.embeds&&(s=l.embeds.filter(n=>{let a=n.link;if(a.includes("/")&&(a=a.split("/").last(),a.includes("#")&&(a=a.replace(/#.+/g,""))),a.includes("#")&&(a=a.replace(/#.+/g,"")),e[a.toLowerCase()])return n})),u=o.concat(s),p()}function p(){for(let o of u){let s=o.link,n="",a={};typeof o.displayText!="undefined"&&(n=o.displayText),s.includes("/")&&(s=s.split("/").last());let g="";if(!s.includes("#"))g=e[s.toLowerCase()],a.link=s,g&&(a.relativePath=g),n!==s&&(a.displayText=n);else if(s.includes("#")&&s.charAt(0)!=="#"){let h=n,v=s.replace(/#.+/g,"");g=e[v.toLowerCase()],a.link=s,a.cleanLink=v,(!n.includes("#")||!n.includes(">"))&&(a.displayText=h),g&&(a.relativePath=g)}else s.charAt(0)==="#"&&(g=t,a.link=s,a.relativePath=g,a.cleanLink=c,s!==n&&(a.displayText=n));d.push(a)}d.length>0&&(i.links=d)}return i}var w=b(require("obsidian")),O={tagPath:"",metadataPath:"",allExceptMdPath:"",tagFile:"tags.json",metadataFile:"metadata.json",allExceptMdFile:"allExceptMd.json",writingFrequency:"0",writeFilesOnLaunch:!1,consoleLog:!1},T=class extends w.PluginSettingTab{constructor(i,e){super(i,e);this.plugin=e}display(){let{containerEl:i}=this;i.empty(),i.createEl("h2",{text:"Metadata Extractor Settings"}),new w.Setting(i).setName("File-write path for tags").setDesc("Where the tag-to-file-names JSON file will be saved. Requires the file name with extension. 			If this is filled in, the setting below won't have any effect.").addText(e=>e.setPlaceholder("/home/user/Downloads/tags.json").setValue(this.plugin.settings.tagPath).onChange(t=>m(this,null,function*(){this.plugin.settings.tagPath=t,yield this.plugin.saveSettings()}))),new w.Setting(i).setName("File name of tag-to-file-names JSON").setDesc("Requires the .json extension. 			Only change this setting if you want to change the name of the saved json in the plugin folder.").addText(e=>e.setPlaceholder("tags.json").setValue(this.plugin.settings.tagFile).onChange(t=>m(this,null,function*(){this.plugin.settings.tagFile=t,yield this.plugin.saveSettings()}))),new w.Setting(i).setName("File-write path for metadata").setDesc("Where the metadata JSON file will be saved. Requires the file name with extension. 			If this is filled in, the setting below won't have any effect.").addText(e=>e.setPlaceholder("/home/user/Downloads/metadata.json").setValue(this.plugin.settings.metadataPath).onChange(t=>m(this,null,function*(){this.plugin.settings.metadataPath=t,yield this.plugin.saveSettings()}))),new w.Setting(i).setName("File name of metadata JSON").setDesc("Requires the .json extension; leave empty if setting above was changed. 			Only change this setting if you want to change the name of the saved json in the plugin folder.").addText(e=>e.setPlaceholder("metadata.json").setValue(this.plugin.settings.metadataFile).onChange(t=>m(this,null,function*(){this.plugin.settings.metadataFile=t,yield this.plugin.saveSettings()}))),new w.Setting(i).setName("File-write path of allExceptMd JSON").setDesc("Where the allExceptMd JSON file will be saved. Requires the file name with extension. 			If this is filled in, the setting below won't have any effect.").addText(e=>e.setPlaceholder("/home/user/Downloads/allExceptMd.json").setValue(this.plugin.settings.allExceptMdPath).onChange(t=>m(this,null,function*(){this.plugin.settings.allExceptMdPath=t,yield this.plugin.saveSettings()}))),new w.Setting(i).setName("File name of allExceptMd JSON").setDesc("Requires the .json extension; leave empty if setting above was changed. 			Only change this setting if you want to change the name of the saved json in the plugin folder.").addText(e=>e.setPlaceholder("metadata.json").setValue(this.plugin.settings.allExceptMdFile).onChange(t=>m(this,null,function*(){this.plugin.settings.allExceptMdFile=t,yield this.plugin.saveSettings()}))),new w.Setting(i).setName("Configure frequency for writing the three JSON files").setDesc("The frequency has to be entered in minutes. Set it to 0 to disable the periodic writing.").addText(e=>e.setPlaceholder("120").setValue(this.plugin.settings.writingFrequency).onChange(t=>m(this,null,function*(){t===""?this.plugin.settings.writingFrequency="0":this.plugin.settings.writingFrequency=t,yield this.plugin.saveSettings(),this.plugin.methods.setWritingSchedule(this.plugin.settings.tagFile,this.plugin.settings.metadataFile,this.plugin.settings.allExceptMdFile)}))),new w.Setting(i).setName("Write JSON files automatically when Obsidian launches").setDesc("If enabled, the JSON files will be written each time Obsidian starts.").addToggle(e=>{e.setValue(this.plugin.settings.writeFilesOnLaunch).onChange(t=>{this.plugin.settings.writeFilesOnLaunch=t,this.plugin.saveSettings()})}),new w.Setting(i).setName("Show console logs").setDesc("Only enable this for debugging purposes.").addToggle(e=>{e.setValue(this.plugin.settings.consoleLog).onChange(t=>{this.plugin.settings.consoleLog=t,this.plugin.saveSettings()})})}};var C=class extends N.Plugin{constructor(){super(...arguments);this.intervalId1=void 0;this.intervalId2=void 0;this.intervalId3=void 0;this.methods=new x(this,this.app)}onload(){return m(this,null,function*(){console.log("loading Metadata Extractor plugin"),yield this.loadSettings(),this.addCommand({id:"write-tags-json",name:"Write JSON file with tags and associated file names to disk.",callback:()=>{this.methods.writeTagsToJSON(this.settings.tagFile)}}),this.addCommand({id:"write-metadata-json",name:"Write JSON file with metadata to disk.",callback:()=>{this.methods.writeCacheToJSON(this.settings.metadataFile)}}),this.addCommand({id:"write-allExceptMd-json",name:"Write JSON file with all folders and non-MD files to disk.",callback:()=>{this.methods.writeAllExceptMd(this.settings.allExceptMdFile)}}),this.addSettingTab(new T(this.app,this)),this.settings.writeFilesOnLaunch&&this.app.workspace.onLayoutReady(()=>{this.methods.writeTagsToJSON(this.settings.tagFile),this.methods.writeCacheToJSON(this.settings.metadataFile),this.methods.writeAllExceptMd(this.settings.allExceptMdFile)}),this.methods.setWritingSchedule(this.settings.tagFile,this.settings.metadataFile,this.settings.allExceptMdFile)})}onunload(){console.log("unloading Metadata Extractor plugin")}loadSettings(){return m(this,null,function*(){this.settings=Object.assign({},O,yield this.loadData())})}saveSettings(){return m(this,null,function*(){yield this.saveData(this.settings)})}};0&&(module.exports={});

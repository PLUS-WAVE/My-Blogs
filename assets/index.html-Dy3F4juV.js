import{_ as s,c as a,e as t,o as e}from"./app-koSCgMdL.js";const n={};function l(p,i){return e(),a("div",null,i[0]||(i[0]=[t(`<h2 id="_4-1-全特化-full-specialization" tabindex="-1"><a class="header-anchor" href="#_4-1-全特化-full-specialization"><span>4.1 全特化 full specialization</span></a></h2><p>模板是<em>泛化</em>，特化是泛化的反面，可以针对不同的类型，来设计不同的东西</p><ul><li>其语法为<code>template&lt;&gt;</code> <code>struct xxx&lt;type&gt;</code></li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">struct</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> hash</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">char</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">...</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    size_t</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> operator</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">char&amp;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> const</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;}</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">struct</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> hash</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">...</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">	size_t</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> operator</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int&amp;</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> const</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这里编译器就会用 <code>int</code> 的那段代码；注意：<code>hash&lt;int&gt;()</code> 是创建临时变量</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">cout </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;&lt;</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> hash</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;()(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1000</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_4-2-偏特化-partial-specialization" tabindex="-1"><a class="header-anchor" href="#_4-2-偏特化-partial-specialization"><span>4.2 偏特化 partial specialization</span></a></h2><h3 id="_4-2-1-个数上的偏" tabindex="-1"><a class="header-anchor" href="#_4-2-1-个数上的偏"><span>4.2.1 个数上的偏</span></a></h3><p>例如：第一个模板参数我想针对 <code>bool</code> 特别设计</p><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2023-08-07/image-20230807155256372.png" alt="image-20230807155256372" style="zoom:58%;"><p>注意绑定模板参数不能跳着绑定，需要从左到右</p><h3 id="_4-2-2-范围上的偏" tabindex="-1"><a class="header-anchor" href="#_4-2-2-范围上的偏"><span>4.2.2 范围上的偏</span></a></h3><p>例如：想要当模板参数是指针时特别设计</p><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2023-08-07/image-20230807160122944.png" alt="image-20230807160122944" style="zoom:67%;"><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">C</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">string</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> obj1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> //编译器会调用上面的</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">C</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">string</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*&gt;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> obj2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> //编译器会调用下面的</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>`,16)]))}const r=s(n,[["render",l],["__file","index.html.vue"]]),k=JSON.parse(`{"path":"/cpp/mtbl9rrh/","title":"4 specialization 特化","lang":"zh-CN","frontmatter":{"title":"4 specialization 特化","createTime":"2023/08/11 17:48:37","permalink":"/cpp/mtbl9rrh/","description":"4.1 全特化 full specialization 模板是泛化，特化是泛化的反面，可以针对不同的类型，来设计不同的东西 其语法为template<> struct xxx<type> 这里编译器就会用 int 的那段代码；注意：hash<int>() 是创建临时变量 4.2 偏特化 partial specialization 4.2.1 个数上的...","head":[["meta",{"property":"og:url","content":"https://plus-wave.github.io/cpp/mtbl9rrh/"}],["meta",{"property":"og:site_name","content":"PLUS-WAVE's Blog"}],["meta",{"property":"og:title","content":"4 specialization 特化"}],["meta",{"property":"og:description","content":"4.1 全特化 full specialization 模板是泛化，特化是泛化的反面，可以针对不同的类型，来设计不同的东西 其语法为template<> struct xxx<type> 这里编译器就会用 int 的那段代码；注意：hash<int>() 是创建临时变量 4.2 偏特化 partial specialization 4.2.1 个数上的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-23T12:28:40.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-23T12:28:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"4 specialization 特化\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-23T12:28:40.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":0.81,"words":244},"git":{"updatedTime":1732364920000,"contributors":[{"name":"PLUS_WAVE","email":"wangplus_wave@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/PLUS_WAVE?v=4","url":"https://github.com/PLUS_WAVE"}]},"autoDesc":true,"filePathRelative":"notes/C++/2.面向对象高级开发 Part2/4. 4 specialization 特化.md","bulletin":false}`);export{r as comp,k as data};